<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

$id = $_GET['id'];
$approval = $_GET['approved'];

echo 'oh so you want to enable '.$id' huh?';

if($approval) {
	echo 'it shall be done';
} else {
	echo 'sorry no can do';
}

?>