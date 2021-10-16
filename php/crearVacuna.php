<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

$method = $_SERVER['REQUEST_METHOD'];
    include "conectar.php";
    $mysqli = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $mysqli->set_charset('utf8');

	
	$vacuna = $dataObject-> vacuna;
	$disponible = $dataObject-> disponible;
	$ndosis = $dataObject-> ndosis;
	$dosis2 = $dataObject-> diasDosis2;
	$dosis3 = $dataObject-> diasDosis3;
	



	$sql = "call crear_vacuna('$vacuna', '$disponible', '$ndosis', '$dosis2','$dosis3')";


	if ($mysqli->query($sql) == TRUE) {
		echo json_encode(array('confirmacion'=>true  ) );
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}

$mysqli->close();
	
//fuente https://www.w3schools.com/php/php_mysql_insert.asp
?>