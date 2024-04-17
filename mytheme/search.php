<?php

namespace WordPressStarter\Theme;

use Timber;

$context = Timber::context();
$context["title"] = "Search results for " . get_search_query();
$context["posts"] = Timber::get_posts();

renderTemplates("search.twig", $context);
