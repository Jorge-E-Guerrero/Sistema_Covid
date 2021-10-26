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
	
	$inscripcion = $dataObject-> inscripcion;
  $vacuna = $dataObject-> vacuna;
  $dosis1_fecha = $dataObject-> dosis1_fecha;
  $dosis1 = $dataObject-> dosis1;
  $dosis2_fecha = $dataObject-> dosis2_fecha;
  $dosis2 = $dataObject-> dosis2;
  $refuerzo_fecha = $dataObject-> refuerzo_fecha;
  $dosis3 = $dataObject-> dosis3;
  $proceso = $dataObject-> proceso;





  if ($nueva_consulta = $mysqli->prepare("select cast(FLOOR(RAND()*(8000000000000000000)+10000000000000000000) as varchar(100)) as nuevo_codigo")) 
      { 
        
        $nueva_consulta->execute();
        $resultado = $nueva_consulta->get_result();

        
        if ($resultado->num_rows == 1) 
        {   
            $datos = $resultado->fetch_assoc();
            $codigo = $datos['nuevo_codigo'];

            $sql = "call generar_pdf('$codigo', '$inscripcion', '$vacuna', '$dosis1_fecha', '$dosis1','$dosis2_fecha', '$dosis2', '$refuerzo_fecha', '$dosis3', '$proceso')";


            if ($mysqli->query($sql) == TRUE) {
              echo json_encode(array( 'confirmacion'=>true,
                                   'codigo'=>$codigo,
                                   'inscripcion'=>$inscripcion,
                                   'vacuna'=>$vacuna, 
                                   'dosis1_fecha'=>$dosis1_fecha,
                                   'dosis1'=>$dosis1,
                                   'dosis2_fecha'=>$dosis2_fecha,
                                   'dosis2'=>$dosis2,
                                   'refuerzo_fecha'=>$refuerzo_fecha,
                                   'dosis3'=>$dosis3,
                                   'proceso'=>$proceso
            ) );
            } else {
              echo  json_encode(array('length'=>'0', 'error'=>true)) ;
            }

          }
        else 
        {
              echo json_encode(array('consulta'=>false, 'error' => 'Error'));
        }
        
      }
      else
      {
        echo json_encode(array('consulta'=>false, 'error' => 'No se pudo conectar a BD'));
      }
 




$mysqli->close();
?>
