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




  if ($nueva_consulta = $mysqli->prepare("SELECT 
  *
  FROM proceso
  WHERE dpi = ?")) 
      {
        $nueva_consulta->bind_param('s', $dpi);
        $nueva_consulta->execute();
        $resultado = $nueva_consulta->get_result();
        if ($resultado->num_rows == 1) 
        {
            $datos = $resultado->fetch_assoc();
            $_SESSION['dpi'] = $datos['dpi'];
            echo json_encode(array('inscripcion'=>$datos['inscripcion'],
                                   'vacuna'=>$datos['vacuna'], 
                                   'dosis1_fecha'=>$datos['dosis1_fecha'],
                                   'dosis1'=>$datos['dosis1'],
                                   'dosis2_fecha'=>$datos['dosis2_fecha'],
                                   'dosis2'=>$datos['dosis2'],
                                   'refuerzo_fecha'=>$datos['refuerzo_fecha'],
                                   'dosis3'=>$datos['dosis3'],
                                   'proceso'=>$datos['proceso']
            ) );
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
