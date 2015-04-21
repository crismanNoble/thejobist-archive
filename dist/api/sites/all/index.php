<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

$myArray = array();

$sql = "SELECT * FROM `sites` ";
$result = $db->query($sql);
if($db->affected_rows){
	while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
    }
    echo json_encode($myArray);
} else {
	echo "Sorry, there has been an error.";
}

$result->close();
$db->close();


?>