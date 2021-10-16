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
	//$dosis =	$dataObject-> dosis;


  //$sql = select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.dpi, v.dosis1_fecha , c.* from usuario u inner join vacuna v on u.dpi = v.dpi inner join centro_vacunacion c on u.dpi = c.dpi  where v.dosis1_fecha = date(now()) and u.dpi = 123;
  

  $sql = "select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
  inner join vacuna v on u.dpi = v.dpi 
  inner join centro_vacunacion c on u.dpi = c.dpi  
  where ( v.dosis1_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day) 
          or v.dosis2_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day) 
          or v.refuerzo_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day) )
          and u.dpi = '$dpi' and c.centro = '$centro'";




  $sql2 = "SELECT * from confirmacion WHERE dpi = '$dpi' and vacuna != '' ";
  $sql3 = "SELECT * from confirmacion WHERE dpi = '$dpi' and vacuna = '' ";


          
  if ($mysqli->query($sql) == TRUE) {
    $validacion =  $mysqli->query($sql);
    //$validacion = $consulta->get_result();
    if(  $validacion->num_rows == 1)
    {
      $validacion2 =  $mysqli->query($sql2);
      $validacion3 =  $mysqli->query($sql3);
      if($validacion2->num_rows == 1){
        $datos = $validacion2->fetch_assoc();
        $_SESSION['dpi'] = $datos['dpi'];
        echo json_encode(array('Registrado'=>true, 'Asignado'=>true ,'dpi'=>$datos['dpi'], 'nombre'=>$datos['nombre'],  'apellido'=>$datos['apellido'], 
        'fecha_nacimiento'=>$datos['fecha_nacimiento'], 
        'vacuna'=>$datos['vacuna'],'dosis1_fecha'=>$datos['dosis1_fecha'], 
        'dosis2_fecha'=>$datos['dosis2_fecha'] ,
        'refuerzo_fecha'=>$datos['refuerzo_fecha'],'dosis1'=>$datos['dosis1'],
        'dosis2'=>$datos['dosis2'], 'dosis3'=>$datos['dosis3']
        ) );

      } else if ($validacion3->num_rows == 1){
        $datos = $validacion3->fetch_assoc();
        $_SESSION['dpi'] = $datos['dpi'];
        echo json_encode(array('Registrado'=>true, 'Asignado'=>false ,'dpi'=>$datos['dpi'], 'nombre'=>$datos['nombre'],  'apellido'=>$datos['apellido'], 
        'fecha_nacimiento'=>$datos['fecha_nacimiento'], 
        'vacuna'=>$datos['vacuna'],'dosis1_fecha'=>$datos['dosis1_fecha'], 
        'dosis2_fecha'=>$datos['dosis2_fecha'] ,
        'refuerzo_fecha'=>$datos['refuerzo_fecha'],'dosis1'=>$datos['dosis1'],
        'dosis2'=>$datos['dosis2'], 'dosis3'=>$datos['dosis3']
        ) );

      } else {
        echo json_encode(array('conectado'=>false, 'error' => 'Usuario no encontrado'));
      }
    
    } 
    else 
    {
      echo  json_encode(array('length'=>'0', 'error'=>true)) ;
    }
  }else{
    echo  json_encode(array('length'=>'0', 'error'=>true)) ;
  }





$mysqli->close();
?>
