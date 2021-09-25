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
  $centro = $dataObject-> centro;
	$dosis =	$dataObject-> dosis;


  //$sql = select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.dpi, v.dosis1_fecha , c.* from usuario u inner join vacuna v on u.dpi = v.dpi inner join centro_vacunacion c on u.dpi = c.dpi  where v.dosis1_fecha = date(now()) and u.dpi = 123;
  

  $sql = "select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
  inner join vacuna v on u.dpi = v.dpi 
  inner join centro_vacunacion c on u.dpi = c.dpi  
  where ( v.dosis1_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) 
          or v.dosis2_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) 
          or v.refuerzo_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) )
          and u.dpi = '$dpi' and c.centro = '$centro'";




  if ($mysqli->query($sql) == TRUE) {
    $validacion =  $mysqli->query($sql);
    //$validacion = $consulta->get_result();
    if(  $validacion->num_rows == 1)
    {
      if ($nueva_consulta = $mysqli->prepare("SELECT 
      *
      FROM confirmacion
      WHERE dpi = ?")) 
          {
            $nueva_consulta->bind_param('s', $dpi);
            $nueva_consulta->execute();
            $resultado = $nueva_consulta->get_result();
            if ($resultado->num_rows == 1) 
            {
                $datos = $resultado->fetch_assoc();
                $_SESSION['dpi'] = $datos['dpi'];
                echo json_encode(array('Registrado'=>true,'dpi'=>$datos['dpi'], 'nombre'=>$datos['nombre'],  'apellido'=>$datos['apellido'], 
                'fecha_nacimiento'=>$datos['fecha_nacimiento'], 'dosis'=>$dosis, 
                'vacuna'=>$datos['vacuna'],'dosis1_fecha'=>$datos['dosis1_fecha'], 
                'dosis2_fecha'=>$datos['dosis2_fecha'] ,
                'refuerzo_fecha'=>$datos['refuerzo_fecha'],'dosis1'=>$datos['dosis1'],
                'dosis2'=>$datos['dosis2'], 'dosis3'=>$datos['dosis3']
                ) );
            }
            else 
            {
                  echo json_encode(array('conectado'=>false, 'error' => 'El usuario no existe.'));
            }
            
          }
          else
          {
            echo json_encode(array('conectado'=>false, 'error' => 'No se pudo conectar a BD'));
          }
    }
    else
    {
      echo json_encode(array('conectado'=>false, 'error' => 'No esta registrado'));
    }
    
	} 
  else 
  {
		echo  json_encode(array('length'=>'0', 'error'=>true)) ;
	}


  /*
  if ($nueva_consulta = $mysqli->prepare("select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
  inner join vacuna v on u.dpi = v.dpi 
  inner join centro_vacunacion c on u.dpi = c.dpi  
  where (v.dosis1_fecha = date(now()) or v.dosis2_fecha = date(now()) or v.refuerzo_fecha = date(now()) ) and u.dpi = '$dpi' and c.centro = '$centro';")) {
        //$nueva_consulta->bind_param('s', $dpi);
        $nueva_consulta->execute();
        $resultado = $nueva_consulta->get_result();
        //if ($resultado->num_rows == 1) {
            //$datos = $resultado->fetch_assoc();
            // $encriptado_db = $datos['clave'];
            //if (password_verify($pas, $encriptado_db))
            //{
                $_SESSION['dpi'] = $datos['dpi'];
                echo json_encode(array('Registrado'=>true,'dpi'=>$datos['dpi'], 'nombre'=>$datos['nombre'],  'apellido'=>$datos['apellido'], 'fecha_nacimiento'=>$datos['fecha_nacimiento'], 'dosis'=>$dosis ) );
              //}

              // else {

              //   echo json_encode(array('conectado'=>false, 'error' => 'La clave es incorrecta, vuelva a intentarlo.'));
              //      }
        }
        else {
              echo json_encode(array('Registrado'=>false, 'error' => 'El registro no existe.'));
        }
        $nueva_consulta->close();
      }
      else{
        echo json_encode(array('Registrado'=>false, 'error' => 'No se pudo conectar a BD'));
      }
 // }
*/




$mysqli->close();
?>
