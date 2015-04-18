<?php

header('Access-Control-Allow-Origin: *');

include '../../connection.php'; //exposes $db

//core data
$title = $_POST['title'];
$url = $_POST['url'];
$description = $_POST['description'];
$tags = $_POST['tags'];
$added = $_POST['timestamp'];

echo $title;
echo 'was recieved';
//for detecting spammers
$ts = $_SERVER['REQUEST_TIME'];
$ip = $_SERVER['REMOTE_ADDR'];
$ua = $_SERVER['HTTP_USER_AGENT'];
$rp = $_POST['page'];

echo 'got the data';

if($title && $url && $added){
	echo '(in the think of it)';
	$sql = "INSERT INTO `sites` (`title`, `url`, `description`, `added`, `tags`) VALUES ('$title', '$url', '$description', '$added', '$tags')";
	//abstract this into a do sql?
	//include 'run_sql.php'; //executes the query cleans up connection
	echo '(made the query)';
	$db->query($sql);
	echo '(ran the query)';
	if($db->affected_rows){
		echo print_r(affected_rows);
		echo "thanks, the query worked";
	} else {
		echo "query error, no rows affected";
	}

	$id = mysqli_insert_id($db);
	echo 'insertid is:'.$id;
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