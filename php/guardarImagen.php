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

	
	$nombre_imagen = $_FILES['imagen']['name'];
	$tipo_imagen = $_FILES['imagen']['type'];
	$tamaño_imagen = $_FILES['imagen']['size'];


	//carpeta destino
	$directorio = $_SERVER['DOCUMENT_ROOT'].'/img/';



	if($tamaño_imagen <= 100000000 ){

	//mover la imagen del directorio temporal hacia el server
	move_uploaded_file($_FILES['imagen']['tmp_name'], $directorio.$nombre_imagen );


	$sql = "call insertar_imagen('$nombre_imagen')";


	if ($mysqli->query($sql) == TRUE) {
		echo json_encode(array('confirmacion'=>true  ) );
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}



	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}



$mysqli->close();
	
//fuente https://www.w3schools.com/php/php_mysql_insert.asp
?>