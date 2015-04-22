<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

$id = $_GET['id'];
$id = intval($id);

$sql = "DELETE FROM  `sites` WHERE  `index` = $id";

$db->query($sql);
if($db->affected_rows){
	echo "thank you, ".$id.' has been removed.';
} else {
	echo "sorry, ".$id.' has not been removed';
}

$db->close();

?>