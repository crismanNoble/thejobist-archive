<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

$id = $_GET['id'];

echo 'oh so you want to remove '.$id' huh?';

?>