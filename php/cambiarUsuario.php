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

	
	$dpi = $dataObject-> dpi;
	$tipo_usuario =	$dataObject-> tipo_usuario;

	

	$sql = "CALL cambiarUsuario('$dpi','$tipo_usuario')";


	if ($mysqli->query($sql) == TRUE) {
		echo json_encode(array('operacion'=>true  ) );
	} else {
		echo  json_encode(array('length'=>'0', 'operacion'=>false)) ;
	}


$mysqli->close();
	
//fuente https://www.w3schools.com/php/php_mysql_insert.asp
?>