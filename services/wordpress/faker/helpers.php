<?php


function _wp($args)
{
  $command = sprintf("wp %s", $args);
  echo $command . "\n";

  $output = null;
  $result_code = null;
  exec($command, $output, $result_code);
  $output = implode("\n", $output);

  if ($result_code !== 0) {
    throw new Exception($output, $result_code);
  }

  if ($output) {
    echo $output . "\n";
  }

  return $output;
}