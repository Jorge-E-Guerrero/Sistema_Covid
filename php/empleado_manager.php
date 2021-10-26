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
  	$emp_no = $_GET['emp_no'];
  	$sql = "select e.first_name, e.last_name,  dep.dept_no, d.dept_name, m.emp_no as manager, m.dept_no from dept_emp dep  
	  inner join employees e on dep.emp_no = e.emp_no
	  inner join departments d on dep.dept_no = d.dept_no
	  inner join dept_manager m on dep.dept_no = m.dept_no where dep.emp_no = '$emp_no' order by m.from_date desc limit 1 ;" ;
  	break;
	case 'POST':
  	$emp_no = $_POST["emp_no"];
 	 
  	$sql = "insert into employees (emp_no, first_name, last_name, gender, hire_date, birth_date) values ('$emp_no', '', '', '', now(), now());";
 	 
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