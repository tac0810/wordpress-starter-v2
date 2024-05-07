<?php

namespace WordPressStarter\Theme;

use Timber;

$context = Timber::context();
$context["title"] = "Search results for " . get_search_query();
$context["posts"] = Timber::get_posts();

render_templates("search.twig", $context);
