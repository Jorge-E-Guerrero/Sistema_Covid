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


if ($nueva_consulta = $mysqli->prepare("select u.nombre, u.apellido, c.email, cen.centro, DATE_FORMAT(date_add(now(),interval 7 day), '%e/%m/%Y') as fecha_programada from usuario u
										inner join vacuna v on u.dpi = v.dpi
										inner join contacto c on u.dpi = c.dpi 
										inner join centro_vacunacion cen on u.dpi = cen.dpi
										where (dosis1_fecha = date(date_add(now(),interval 7 day))) 
										or (dosis2_fecha = date(date_add(now(),interval 7 day)))
										or (refuerzo_fecha = date(date_add(now(),interval 7 day)));")) 
{ 
  
  $nueva_consulta->execute();
  $resultado = $nueva_consulta->get_result();

  
  for ($i=0 ; $i< $resultado->num_rows ; $i++) {
	$dato = $resultado->fetch_assoc();

	$to_email = $dato['email'];
	$subject = "Sistema Covid: Recordatorio";
	$nombre = $dato['nombre'];
	$apellido = $dato['apellido'];
	$centro = $dato['centro'];
	$fecha = $dato['fecha_programada'];
	$body = "Hola $nombre $apellido , te recordamos que tu vacunación esta programada para el dia $fecha la cual se efectuara en el centro $centro ";
	$headers = "From: Sistema Covid";

	//echo $body;

	if (mail($to_email, $subject, $body, $headers)) {
		echo "Email successfully sent to $to_email...";
	} else {
		echo "Email sending failed...";
	}
	//echo $dato['fecha_programada'];
 }

} else {
	echo json_encode(array('consulta'=>false, 'error' => 'No se pudo conectar a BD'));
}
	  
	//mail('koki2337@gmail.com','Sistema Covid: Recordatorio','Hola, recuerda que dentro de una semana esta planificada tu vacunación','From:guerrero191096@unis.edu.gt');
 
$mysqli->close();


?>