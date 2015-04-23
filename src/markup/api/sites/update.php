<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

$id = $_GET['id'];
if(!$id) {
	$id = $_POST['id'];
}
$id = intval($id);
if($id){
	$what = $_GET['what'];
	if(!$what) {
		$what = $_POST['what'];
	}
	$howmuch = $_GET['howmuch'];
	if(!$howmuch) {
		$howmuch = $_POST['howmuch'];
	}

	if($what == 'aproved' || $what == 'upvotes'){
		$sql = "UPDATE `sites` SET `$what` = $howmuch WHERE `sites`.`index` = $id";
	} else {
		$sql = "UPDATE `sites` SET `$what` = '$howmuch' WHERE `sites`.`index` = $id";
	}
	echo $sql;

	$db->query($sql);
	if($db->affected_rows){
		echo "thank you, ".$id.' has been updated.';
	} else {
		echo "sorry, ".$id.' has not been updated';
	}
} else {
	echo "dude, you need an id";
}

$db->close();
?>