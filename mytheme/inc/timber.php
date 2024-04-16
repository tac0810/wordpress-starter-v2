<?php

namespace WordPressStarter\Theme;

use Timber;
use Twig;

Timber\Timber::init();

Timber::$dirname = ["views"];


function debug( $obj, $label = '' ) {
	$label = "[Debug] : {$label}";
	$label .= ' in ';
	$traces = debug_backtrace();
	$count = 0;
	foreach ( $traces as $trace ) {
		if ( isset( $trace[ 'file' ], $trace[ 'line' ] ) && __FILE__ != $trace[ 'file' ] ) {
			$label .= $trace[ 'file' ] . ' (' . $trace[ 'line' ] . ')';
			if ( ++$count >= 5 ) {
				break;
			} else {
				$label .= '<br />';
			}
		}
	}
	echo '<div style="font:11px/1.2 Lucida Grande, Verdana, Geneva, Sans-serif; margin: 1em 0; padding: 0.5em; background:#e9e9e9; border:1px solid #D0D0D0;">';
	if ( strlen( $label ) ) {
		echo '<strong>' . $label . '</strong>';
	}
	echo '<pre style="display: block; background:#F4F4F4; border:1px solid #D0D0D0; color: #002166; margin:0.5em 0; padding:1em;">';
	if ( is_bool( $obj ) ) {
		echo (bool) $obj ? 'true' : 'false';
	} elseif ( is_array( $obj ) || is_object( $obj ) ) {
		print_r( $obj );
	} else {
		echo $obj;
	}
	echo '</pre>';
	echo '</div>';
}

add_filter("timber/twig", function ($twig) {
	$twig->addFunction(
		new Twig\TwigFunction("debug", function ($value) {
			return debug($value);
		})
	);

	$twig->addFunction(
		new Twig\TwigFunction("build_assets", function () {
			$manifest = file_get_contents(dirname(__DIR__) . "/build/.vite/manifest.json");

			if (!isset($manifest)) {
				return null;
			}

			$manifest = json_decode($manifest, true);
			$entry = $manifest["source/index.ts"];
			$build_path = get_template_directory_uri() . '/build/';

			$html = "<!-- production build -->";
			$html .= sprintf('<script type="module" src="%s"></script>', $build_path . $entry['file']);
			$html .= "\n";

			foreach ($entry['dynamicImports'] as $dynamicImport) {
				$import = $manifest[$dynamicImport];
				$html .= sprintf('<script type="module" src="%s"></script>', $build_path . $import['file']);
			}

			foreach ($entry['css'] as $css) {
				$html .= sprintf('<link rel="stylesheet" href="%s" />', $build_path . $css);
			}

			return $html;
		})
	);

	$twig->addFunction(
		new Twig\TwigFunction("sprite", function ($context, $id, $attr = "") {
			$sprite_path = sprintf("/build/sprites/%s.svg", $context);

			$sprite = simplexml_load_string(file_get_contents(dirname(__DIR__) . $sprite_path));

			$default_attr = [];

			foreach ($sprite->symbol as $symbol) {
				$symbol_attr = $symbol->attributes();

				if ($id === (string)$symbol_attr->id) {
					$viewBox = (string)$symbol_attr->viewBox;
					list($min_x, $min_y, $width, $height) = array_map(
						"floatval",
						explode(" ", $viewBox)
					);
					$default_attr["width"] = $width - $min_x;
					$default_attr["height"] = $height - $min_y;

					break;
				}
			}

			if (!(isset($default_attr["width"]) && isset($default_attr["height"]))) {
				return false;
			}

			$attr = wp_parse_args($attr, $default_attr);
			$attr = array_map("esc_attr", $attr);
			$html = "<svg";

			foreach ($attr as $name => $value) {
				$html .= " $name=" . '"' . $value . '"';
			}

			$html .= ">";

			$use_href = get_template_directory_uri() . $sprite_path . "#" . $id;
			$html .= '<use href="' . $use_href . '" />';

			$html .= "</svg>";

			return $html;
		})
	);

	return $twig;
});

add_filter("timber/context", function ($context) {
	$context["IS_DEVELOPMENT"] = $_ENV['IS_DEVELOPMENT'];
	$context["IS_VITE_RUNNING"] = checkViteConnection();

	$context["options"] = get_fields("options");

	$context["about_post"] = Timber::get_post([
		"name" => "about",
		"post_type" => "page",
	]);

	return $context;
});


function checkViteConnection()
{
	if (!$_ENV['IS_DEVELOPMENT']) {
		return false;
	}

	$host = 'host.docker.internal';
	$port = 3000;
	$connection = @fsockopen($host, $port, $errno, $errstr, 5); // 5秒のタイムアウト

	if ($connection) {
		fclose($connection);
		return true;
	} else {
		return false;
	}
}
