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


	$dosis = $dataObject->dosis;
	$parametro = '';
	$parametro2 = '';

	if($dosis == 'dosis3'){
		$parametro = 'refuerzo_fecha';
		$parametro2 = 'dosis3';
	} elseif ($dosis == 'dosis2'){
		$parametro = 'dosis2_fecha';
		$parametro2 = 'dosis2';
	} elseif($dosis == 'dosis1'){
		$parametro = 'dosis1_fecha';
		$parametro2 = 'dosis1';
	}

	if($dosis != "todas"){
		$sql = "select * from ausencia_vacuna
		where $parametro < date_add(now(), interval -7 day) and $parametro2 = false and $parametro != '';";
		
	} else {
		

		$sql = "select * from ausencia_vacuna
		where (dosis1_fecha < date_add(now(), interval -7 day) and dosis1 = false and dosis1_fecha != '')
		or (dosis2_fecha < date_add(now(), interval -7 day) and dosis2 = false and dosis2_fecha != '')
		or (refuerzo_fecha < date_add(now(), interval -7 day) and dosis3 = false and refuerzo_fecha != '');";
	}



	

	$consulta = $mysqli->query($sql);


	if ($consulta == TRUE) {
		echo json_encode($consulta->fetch_all());
		
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}


 
$mysqli->close();


?>