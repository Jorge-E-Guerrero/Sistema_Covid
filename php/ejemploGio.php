<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "employees";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	case 'GET':
  	$emp_no = $_GET['emp_no'];
  	$sql = "select * from employees".($emp_no?" where emp_no=$emp_no":'').;
  	break;
	case 'POST':
  	$emp_no = $_POST["emp_no"];
 	 
 	 
  	$sql = "insert into employees (emp_no, first_name, last_name, gender, hire_date, birth_date) values ('$emp_no', '', '', '', now(), now());";
 	 
  	break;
}

// ($condicional? if : else)
// . concatenar

// run SQL statement
//echo $sql;
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
	if (!$emp_no) echo '[';
	for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
  	echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
	}
	if (!$emp_no) echo ']';
  } elseif ($method == 'POST') {
	echo json_encode($result);
  } else {
	echo mysqli_affected_rows($con);
}

$con->close();

?>