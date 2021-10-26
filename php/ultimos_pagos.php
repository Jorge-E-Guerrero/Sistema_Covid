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

	
		  
	$sql = "select s.salary,s.from_date,e.first_name,e.last_name from salaries s inner join employees e ON s.emp_no = e.emp_no where s.from_date > DATE_ADD(now(), INTERVAL -30 DAY);";

  	break;
	case 'POST':

 	 
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

	


	for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
  	echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
	}

	
} elseif ($method == 'POST') {
	echo json_encode(mysqli_fetch_object($result));
  } else {
	echo mysqli_affected_rows($con);
}


$con->close();


?>