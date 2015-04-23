<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

$id = $_GET['id'];
$id = intval($id);
$what = $_GET['what'];
$howmuch = $_GET['howmuch'];

$sql = "UPDATE `sites` SET `$what` = $howmuch WHERE `sites`.`index` = $id";
$db->query($sql);
if($db->affected_rows){
	echo "thank you, ".$id.' has been updated.';
} else {
	echo "sorry, ".$id.' has not been updated';
}
$db->close();
?>