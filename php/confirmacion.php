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

	



	$sql = "CALL confirmar_dosis( '$dpi')";


	if ($mysqli->query($sql) == TRUE) {
		echo json_encode(array('confirmacion'=>true  ) );
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}
/*
	echo $password;
	echo "<br/>";
	echo $clave;
	echo "<hr/>";
*/	
/*
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
*/
/*
if ($sql = $mysqli->prepare("CALL registro('$dpi','$clave','$nombre','$apellido','$fecha_nacimiento','$tipo_usuario','$telefono','$email','$centro','$enfermedad','$grupo')")){
	$sql->execute();
	
	
} else {
	echo  json_encode(array('error'=>'error')) ;
}
*/
/*
echo json_encode(array('conectado'=>true) );	
*/
//echo json_encode(array('conectado'=>true ,'dpi'=>$dpi, 'nombre'=>$nombre,  'apellido'=>$apellido, 'fecha_nacimiento'=>$fecha_nacimiento, 'tipo_usuario'=>$tipo_usuario ) );

/*

if ($method == 'POST') {
	echo json_encode(array('conectado'=>true ,'dpi'=>$dpi, 'nombre'=>$nombre,  'apellido'=>$apellido, 'fecha_nacimiento'=>$fecha_nacimiento, 'tipo_usuario'=>$tipo_usuario ) );
} else {
	echo mysqli_affected_rows($con);
}
*/








 
$mysqli->close();
	
//fuente https://www.w3schools.com/php/php_mysql_insert.asp
?>