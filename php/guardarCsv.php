<?php

if(!empty($_FILES['file']['name']))
{
 $connect = new PDO("mysql:host=localhost;dbname=sistema_covid;", "root", "", array(
        PDO::MYSQL_ATTR_LOCAL_INFILE => true,
    ));

 $total_row = count(file($_FILES['file']['tmp_name']));

 $file_location = str_replace("\\", "/", $_FILES['file']['tmp_name']);

 $query_1 = '
 
 LOAD DATA LOCAL INFILE "'.$file_location.'"
			IGNORE 
		INTO TABLE 	data_cvs 
		FIELDS TERMINATED BY ";"
		LINES TERMINATED BY "\r\n" 
		IGNORE 1 LINES
		(@column1,@column2,@column3,@column4,@column5,@column6,@column7,@column8,@column9,@column10,@column11)
		SET dpi = @column1,
			clave = @column2,
			nombre = @column3,
			apellido = @column4,
			fecha_nacimiento = STR_TO_DATE(@column5, "%d/%m/%Y"),
			tipo_usuario = @column6,
			telefono = @column7,
			email = @column8,
			centro = @column9,
			enfermedad = @column10,
			grupo = @column11 ';	

			$statement = $connect->prepare($query_1);

 $statement->execute();

 $output = array(
	'success' => 'Total <b>'.$total_row.'</b> Data imported'
   );
  
   echo json_encode($output);

}
	
//fuente https://www.w3schools.com/php/php_mysql_insert.asp
?>