<?php

namespace WordPressStarter\Theme;

use Timber;

$context = Timber::context();
render_templates("404.twig", $context);
