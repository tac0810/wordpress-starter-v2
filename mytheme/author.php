<?php

namespace WordPressStarter\Theme;

use Timber;

global $wp_query;

$context = Timber::context();
$context["posts"] = Timber::get_posts();
if (isset($wp_query->query_vars["author"])) {
  $author = Timber::get_user($wp_query->query_vars["author"]);
  $context["author"] = $author;
  $context["title"] = "Author Archives: " . $author->name();
}
renderTemplates("author.twig", $context);
