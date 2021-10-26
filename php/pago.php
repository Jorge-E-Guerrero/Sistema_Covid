<?php

$host = "localhost";
$user = "root";
$password = "";
$dbname = "employees";

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	case 'GET':

  	break;
	case 'POST':
  	$emp_no = $_POST["emp_no"];
	$monto = $_POST["monto"];
 	 
  	$sql = "call pago( '$emp_no' , '$monto' );";
 	 
  	break;
}

// ($condicional? if : else)
// . concatenar


$result = mysqli_query($con,$sql);

if (!$result) {
	http_response_code(404);
	die(mysqli_error($con));
}


if ($method == 'GET') {

	
	if($emp_no){
		echo json_encode(mysqli_fetch_object($result));
	} else {
		echo json_encode(array('prueba'=>'123456'));
	}
	/*
	if (!$emp_no) echo '[';
	for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
  	echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
	}
	if (!$emp_no) echo ']';
	*/
} elseif ($method == 'POST') {
	echo json_encode(mysqli_fetch_object($result));
  } else {
	echo mysqli_affected_rows($con);
}


$con->close();


?>