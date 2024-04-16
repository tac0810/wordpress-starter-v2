<?php

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

function renderTemplates($templates, $context)
{
	$IS_DEVELOPMENT = $context['IS_DEVELOPMENT'];
	$render = Timber::compile($templates, $context);
	if ($IS_DEVELOPMENT && !is_admin() && !str_contains($_SERVER['HTTP_HOST'], 'localhost')) {
		$hostname = parse_url($_SERVER['HTTP_HOST'], PHP_URL_HOST);
		echo str_replace('localhost', $hostname, $render);
	} else {
		echo $render;
	}
}

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
