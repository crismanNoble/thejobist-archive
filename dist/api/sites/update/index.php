<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

$id = $_GET['id'];
$id = intval($id);
$approval = $_GET['approved'];

$sql = "UPDATE `sites` SET `approved` = $approval WHERE `sites`.`index` = $id";
$db->query($sql);
if($db->affected_rows){
	echo "thank you, ".$id.' has been updated.';
} else {
	echo "sorry, ".$id.' has not been updated';
}
$db->close();
?>