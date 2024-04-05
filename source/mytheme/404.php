<?php

namespace WordPressStarter\Theme;

use Timber;

$context = Timber::context();
renderTemplates("404.twig", $context);
