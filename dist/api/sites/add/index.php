<?php

include '../../cors.php';
include '../../connection.php'; //exposes $db

//core data
$title = $_POST['title'];
$url = $_POST['url'];
$description = $_POST['description'];
$tags = $_POST['tags'];
$added = $_POST['timestamp'];

//for detecting spammers
$ts = $_SERVER['REQUEST_TIME'];
$ip = $_SERVER['REMOTE_ADDR'];
$ua = $_SERVER['HTTP_USER_AGENT'];
$rp = $_POST['page'];

if($title && $url && $added){
	$sql = "INSERT INTO `sites` (`title`, `url`, `description`, `added`, `tags`) VALUES ('$title', '$url', '$description', '$added', '$tags')";
	//abstract this into a do sql?
	//include 'run_sql.php'; //executes the query cleans up connection
	$db->query($sql);
	if($db->affected_rows){
		echo print_r(affected_rows);
		echo "Than you for your submission.";
	} else {
		echo "Sorry, there has been an error.";
	}

	$id = mysqli_insert_id($db);
}

$db->close();

$to  = "jcnoble2@gmail.com";

// subject
$subject = 'New site submission for theJobist';

// message
$message = '<b>New site idea!</b><br/>';
$message .='title: '.$title.'<br/>';
$message .='description: '.$description.'<br/>';
$message .='url: <a href="'.$url.'">'.$url.'</a><br/>';
$message .='tags: '.$tags.'<br/>';
$message .= '<br/><br/>';
$message .= 'To delete this site from the queue: <a href="http://api.thejobist.com/sites/remove/?id='.$id.'">click here</a><br/>';
$message .= 'To enable this site: <a href="http://api.thejobist.com/sites/update/?id='.$id.'&approved=1">click here</a><br/>';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'From: noreply@thejobist.com';

// Mail it
mail($to, $subject, $message, $headers);


?>