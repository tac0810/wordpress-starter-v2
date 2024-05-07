<?php

namespace WordPressStarter\Theme;

use Timber;

$context = Timber::context();

$templates = ["index.twig"];

if (is_home()) {
  array_unshift($templates, "front-page.twig", "home.twig");
}

render_templates($templates, $context);
