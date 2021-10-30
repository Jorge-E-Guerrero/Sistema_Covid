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


	$inicio = $dataObject-> inicio;
  	$final = $dataObject-> final;


	$sql = "select u.dpi, u.nombre, u.apellido, c.centro, v.vacuna, v.dosis1_fecha, v.dosis2_fecha, v.refuerzo_fecha from usuario u 
	inner join centro_vacunacion c on u.dpi = c.dpi
	inner join vacuna v on u.dpi = v.dpi
	inner join historial h on u.dpi = h.dpi 
	where (dosis1 = true and v.dosis1_fecha between '$inicio' and '$final') 
	or (dosis2 = true and v.dosis2_fecha between  '$inicio' and '$final') 
	or (dosis3 = true and v.refuerzo_fecha between  '$inicio' and '$final')
	order by c.centro, v.dosis1_fecha, v.dosis2_fecha, v.refuerzo_fecha; ";

	$consulta = $mysqli->query($sql);


	if ($consulta == TRUE) {

		echo json_encode($consulta->fetch_all());
	
	} else {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}


 
$mysqli->close();


?>