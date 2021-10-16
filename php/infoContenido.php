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


	$sql = "select * FROM contenido; ";
	$consulta = $mysqli->query($sql);


	if ($consulta == TRUE) {
		//echo json_encode(array($consulta->fetch_all()));
		echo json_encode($consulta->fetch_all());
		/*

		for ($i=0 ; $i< $consulta->num_rows ; $i++) {
			$dato = $consulta->fetch_assoc();
			echo json_encode(array( 'imagen'=>$dato['nombre_imagen'] , 'titulo'=>$dato['titulo'] ,'texto'=>$dato['contenido'] ));
			
		}*/
/*

		$datos = $consulta->fetch_assoc();
		echo json_encode(array( 'titulo'=>$datos['titulo'] ,'texto'=>$datos['contenido'] ));
*/		
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}


 
$mysqli->close();


?>