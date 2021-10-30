-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2021 a las 06:41:16
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_covid`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `asignacion_dosis` (IN `dpi_x` BIGINT(13), IN `dosis` VARCHAR(60))  begin
  start transaction;
  
  
  update vacuna set vacuna = dosis where dpi = dpi_x;
  /*
    if dosis = 'Pfizer' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 21 day) where dpi = dpi_x;
      update vacuna set refuerzo_fecha = DATE_ADD(DATE_ADD(now() , INTERVAL 21 day) , INTERVAL 8 MONTH) where dpi = dpi_x;
    end if;
    
    if dosis = 'Moderna' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 28 day) where dpi = dpi_x;
      update vacuna set refuerzo_fecha = DATE_ADD(DATE_ADD(now() , INTERVAL 28 day) , INTERVAL 8 MONTH) where dpi = dpi_x;
    end if;
    if dosis = 'Aztrazeneca' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 28 day) where dpi = dpi_x;
    end if;
    if dosis = 'Janssen' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
    end if;
    if dosis = 'Sinopharm' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 21 day) where dpi = dpi_x;
    end if;
    if dosis = 'Sinovac' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 14 day) where dpi = dpi_x;
    end if;
    if dosis = 'Sputnik' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 21 day) where dpi = dpi_x;
    end if;
    */
    commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `asignar_fecha` ()  begin
  declare done boolean default false;
  declare a bigint(13) default 0;
  declare b datetime default '';
  declare c varchar(80) default '';
  declare centro_anterior varchar(80) default '';
  declare capacidad_x int default '';
  declare dias_x int default '';
  declare contador1 int;
  declare contador2 int;
  declare curl cursor for select dpi, fecha_registro, centro FROM cola_centro;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  start transaction;
  
  open curl;
    read_loop: loop
      fetch curl into a,b,c;
      if done then 
        leave read_loop;
      end if;
      if c != centro_anterior then
          set centro_anterior = c;
          select dias_asignacion, capacidad_diaria into dias_x,capacidad_x FROM catalogo_centro where centro = c;
          set contador1 = 1;
          set contador2 = 0;
          update vacuna set dosis1_fecha = DATE_ADD( now() , INTERVAL (dias_x + contador2) DAY) where dpi = a; 
      else 
          if contador1 > capacidad_x then
            set contador2 = contador2 + 1;
          end if;
          update vacuna set dosis1_fecha = DATE_ADD( now(), INTERVAL (dias_x + contador2) DAY) where dpi = a;
      end if;

      
      set contador1 = contador1 + 1;
        
    end loop read_loop;
  close curl;
  
  delete from cola_vacuna;
  
  commit;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_usuario` (IN `dpi_x` BIGINT(13))  begin
  start transaction;
    delete from centro_vacunacion where dpi = dpi_x;
    delete from contacto where dpi = dpi_x;
    delete from grupo_prioritario where dpi = dpi_x;
    delete from enfermedad where dpi = dpi_x;
    delete from vacuna where dpi = dpi_x;
    delete from historial where dpi = dpi_x;
    delete from usuario where dpi = dpi_x;
    
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiarUsuario` (IN `dpi_x` BIGINT(13), IN `tipo_usuario_x` VARCHAR(60))  Begin
  start transaction;
    update usuario set tipo_usuario = tipo_usuario_x where dpi = dpi_x;
  
  
  
  commit;

end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_imagen` (IN `elemento_x` VARCHAR(255), IN `imagen_x` VARCHAR(255))  begin
  start transaction;
    update contenido set nombre_imagen = imagen_x where elemento = elemento_x;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_link` (IN `elemento_x` VARCHAR(255), IN `link_x` VARCHAR(255))  begin
  start transaction;
    update contenido set url = link_x where elemento = elemento_x;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_texto` (IN `elemento_x` VARCHAR(255), IN `titulo_x` VARCHAR(255), IN `texto_x` TEXT)  begin
  start transaction;
    update contenido set titulo = titulo_x where elemento = elemento_x ;
    update contenido set contenido = texto_x  where elemento = elemento_x;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cambio_atributos` (IN `dpi_x` BIGINT(13), IN `atributo` VARCHAR(60), IN `valor` VARCHAR(80))  Begin
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  begin
    rollback;
  end;
  start transaction;

  if atributo = 'nombre' then
   update usuario set nombre = valor where dpi = dpi_x;
  elseif atributo = 'apellido' then
   update usuario set apellido = valor where dpi = dpi_x;
  elseif atributo = 'fecha_nacimiento' then
   update usuario set fecha_nacimiento = STR_TO_DATE(valor,'%d/%m/%Y') where dpi = dpi_x;
  elseif atributo = 'telefono' then
   update contacto set telefono = valor where dpi = dpi_x;
  elseif atributo = 'email' then
   update contacto set email = valor where dpi = dpi_x;
  elseif atributo = 'enfermedad_cronica' then
   update enfermedad set enfermedad_cronica = valor where dpi = dpi_x;
  elseif atributo = 'grupo' then
   update grupo_prioritario set grupo = valor where dpi = dpi_x;
  end if;
  
  
  commit;
  
  
  
  
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `confirmar_dosis` (`dpi_x` BIGINT(13))  begin
  declare vacuna_x varchar(60);
  declare ndosis_x int(11);
  declare dias1_x int(11);
  declare dias2_x int(11);
  declare dosis1_x tinyint(1);
  declare dosis2_x tinyint(1);
  declare dosis3_X tinyint(1);
   start transaction;
   
    select vacuna into vacuna_x FROM vacuna where dpi = dpi_x;
    select ndosis,tiempo_dosis2,tiempo_dosis3 into ndosis_x,dias1_x,dias2_x from catalogo_vacuna where vacuna = vacuna_x;
    select dosis1,dosis2,dosis3 into dosis1_x,dosis2_x,dosis3_x from historial where dpi = dpi_x;
    if dosis1_x = false then
      if ndosis_x > '1' then
        update vacuna set dosis2_fecha = date_add(now(), interval dias1_x day) where dpi = dpi_x;
      end if;
      update historial set dosis1 = true where dpi = dpi_x;
      
    elseif dosis2_x = false then
      if ndosis_x = '3' then
        update vacuna set refuerzo_fecha = date_add(now(), interval dias2_x day) where dpi = dpi_x;
      end if;
      update historial set dosis2 = true where dpi = dpi_x;
      
    elseif dosis3_x = false then
      update historial set dosis3 = true where dpi = dpi_x;
    end if;
   
   
   
   /*
    if dosis_num = 'dosis1_fecha' then 
      update historial set dosis1 = true where dpi = dpi_x;
    end if;
    if dosis_num = 'dosis2_fecha' then 
      update historial set dosis2 = true where dpi = dpi_x;
      if vacuna_x = 'Pfizer' then
        update vacuna set refuerzo_fecha = DATE_ADD(now() , INTERVAL 8 MONTH) where dpi = dpi_x;
      end if;
      if vacuna_x = 'Moderna' then
        update vacuna set refuerzo_fecha = DATE_ADD(now() , INTERVAL 8 MONTH) where dpi = dpi_x;
      end if;
    end if;
    if dosis_num = 'refuerzo_fecha' then 
      update historial set dosis3 = true where dpi = dpi_x;
    end if;
    */
   commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_vacuna` (IN `vacuna_x` VARCHAR(60), IN `disponible_x` VARCHAR(10), IN `ndosis` INT(11), IN `diasDosis2` INT(11), IN `diasDosis3` INT(11))  Begin

  start transaction;
  
      if disponible_x = 'Si' then
    INSERT INTO catalogo_vacuna (vacuna, disponibilidad, ndosis, tiempo_dosis2, tiempo_dosis3)
    VALUES (
      vacuna_x,
      true,
      ndosis,
      diasDosis2,
      diasDosis3
      );
    elseif disponible_x = 'No' then
    INSERT INTO catalogo_vacuna (vacuna, disponibilidad, ndosis, tiempo_dosis2, tiempo_dosis3)
    VALUES (
      vacuna_x,
      false,
      ndosis,
      diasDosis2,
      diasDosis3
      );
    end if;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `disponibilidad_vacuna` (IN `vacuna_x` VARCHAR(60), IN `disponibilidad` VARCHAR(10))  Begin

  start transaction;
  
    if disponibilidad = 'Si' then
      update catalogo_vacuna set disponibilidad = true where vacuna = vacuna_x;
    elseif disponibilidad = 'No' then 
      update catalogo_vacuna set disponibilidad = false where vacuna = vacuna_x;
    end if;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_centro` (IN `centro_x` VARCHAR(80), IN `campo` VARCHAR(10), IN `valor` INT(11))  Begin

  start transaction;
  
    if campo = 'dias' then
      update catalogo_centro set dias_asignacion = valor where Centro = centro_x;
    elseif campo = 'capacidad' then 
      update catalogo_centro set capacidad_diaria = valor where Centro = centro_x;
    end if;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_disponibilidad` (IN `centro_x` VARCHAR(80), IN `disponibilidad` VARCHAR(10))  Begin

  start transaction;
  
    if disponibilidad = 'Si' then
      update catalogo_centro set disponible = true where Centro = centro_x;
    elseif disponibilidad = 'No' then 
      update catalogo_centro set disponible = false where Centro = centro_x;
    end if;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_vacuna` (IN `vacuna_x` VARCHAR(60), IN `campo` VARCHAR(10), IN `valor` INT(11))  Begin

  start transaction;
  
    if campo = 'ndosis' then
      update catalogo_vacuna set ndosis = valor where vacuna = vacuna_x; 
    elseif campo = 'dosis2' then 
      update catalogo_vacuna set tiempo_dosis2 = valor where vacuna = vacuna_x;
    elseif campo = 'dosis3' then 
      update catalogo_vacuna set tiempo_dosis3 = valor where vacuna = vacuna_x;
    end if;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `generar_pdf` (IN `codigo_x` VARCHAR(60), IN `inscripcion_x` VARCHAR(60), IN `vacuna_x` VARCHAR(60), IN `dosis1_fecha_x` VARCHAR(60), IN `dosis1_x` VARCHAR(60), IN `dosis2_fecha_x` VARCHAR(60), IN `dosis2_x` VARCHAR(60), IN `dosis3_fecha_x` VARCHAR(60), IN `dosis3_x` VARCHAR(60), IN `proceso_x` VARCHAR(60))  begin
  start transaction;
    INSERT INTO registro_estado (codigo, inscripcion, vacuna, dosis1_fecha, dosis1, dosis2_fecha, dosis2, refuerzo_fecha, dosis3, proceso, creacion) 
    VALUES (
      codigo_x,
      STR_TO_DATE(inscripcion_x,'%d/%m/%Y'),
      vacuna_x,
      ifnull(STR_TO_DATE(dosis1_fecha_x,'%d/%m/%Y'),'0000-00-00'),
      dosis1_x,
      ifnull(STR_TO_DATE(dosis2_fecha_x,'%d/%m/%Y'),'0000-00-00'),
      dosis2_x,
      ifnull(STR_TO_DATE(dosis3_fecha_x,'%d/%m/%Y'),'0000-00-00'),
      dosis3_x,
      proceso_x, 
      now()
      );
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertar_imagen` (IN `url_x` VARCHAR(255))  begin
  start transaction;
    insert into imagenes (
       nombre_imagen
    ) VALUES (
       url_x
    );
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_centro` (IN `centro_x` VARCHAR(80), IN `disponible_x` VARCHAR(10), IN `dias` INT(11), IN `capacidad` INT(11))  Begin
  start transaction;
  if disponible_x = 'Si' then
    INSERT INTO catalogo_centro (Centro, disponible, dias_asignacion, capacidad_diaria)
    VALUES (
      centro_x,
      true,
      dias,
      capacidad
      );
    elseif disponible_x = 'No' then
    INSERT INTO catalogo_centro (Centro, disponible, dias_asignacion, capacidad_diaria)
    VALUES (
      centro_x,
      false,
      dias,
      capacidad
      );
    end if;
    commit;
  
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registro` (IN `dpi_x` BIGINT(13), IN `clave_x` VARCHAR(130), IN `nombre_x` VARCHAR(60), IN `apellido_x` VARCHAR(60), IN `fecha_nacimiento_x` DATE, IN `tipo_usuario_x` INT(11), IN `telefono_x` INT(11), IN `email_x` VARCHAR(80), IN `centro_x` VARCHAR(60), IN `enfermedad_x` VARCHAR(80), IN `grupo_x` VARCHAR(80))  begin
    declare new_enfermedad int(11);
    declare new_grupo int(11);
    declare bool_enfermedad tinyint(1);
    declare bool_grupo tinyint(1);
    declare edad date;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
      rollback;
    END;
    
    start transaction;
    
    select * into edad from edad_registro;
    
    if enfermedad_x != '' then
      select registro into bool_enfermedad from catalogo_enfermedad where enfermedad_cronica = enfermedad_x;
    else
      set bool_enfermedad = false;
    end if;
    
    if grupo_x != '' then
      select registro into bool_grupo from catalogo_grupo where grupo = grupo_x;
    else
      set bool_grupo = false;
    end if;

    if edad > fecha_nacimiento_x or bool_enfermedad = true or bool_grupo = true or tipo_usuario_x = '2' then
    insert into usuario (dpi ,clave, nombre, apellido, fecha_nacimiento, tipo_usuario, inscripcion, verificado) 
    
    values (
      dpi_x,
      clave_x,
      nombre_x,
      apellido_x,
      fecha_nacimiento_x,
      tipo_usuario_x,
      now(),
      true
    );
    
    insert into centro_vacunacion (dpi , centro ) 
    
    values (
      dpi_x,
      centro_x
    );
    
    insert into contacto (dpi , telefono, email ) 
    
    values (
      dpi_x,
      telefono_x,
      email_x
    );

    insert into vacuna( dpi, vacuna, dosis1_fecha, dosis2_fecha, refuerzo_fecha)
    
    values (
      dpi_x,
      '',
      '',
      '',
      ''
    );
    
    
    insert into historial( dpi, dosis1, dosis2, dosis3 )
    
    values (
      dpi_x,
      false,
      false,
      false
    );
    
    if enfermedad_x != '' then
    insert into enfermedad (dpi, enfermedad_cronica ) 
    values (
      dpi_x,
      enfermedad_x
    );
    end if;
    
    if grupo_x != '' then
    insert into grupo_prioritario (dpi, grupo ) 
    values (
      dpi_x,
      grupo_x
      
      
    );
    end if;
    end if;
    commit;
  
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_enfermedad` (IN `enfermedad_x` VARCHAR(80), IN `valor` VARCHAR(10))  Begin
  start transaction;
    if valor = 'Si' then 
      update catalogo_enfermedad set registro = true where enfermedad_cronica = enfermedad_x;
    elseif valor = 'No' then 
      update catalogo_enfermedad set registro = false where enfermedad_cronica = enfermedad_x;
    end if;
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_fecha` (IN `fecha_x` VARCHAR(80))  Begin
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    rollback;
  END;

  start transaction;
    update edad_registro set fecha = STR_TO_DATE( fecha_x ,'%d/%m/%Y');
  commit;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_grupo` (IN `grupo_x` VARCHAR(80), IN `valor` VARCHAR(10))  Begin
  start transaction;
    if valor = 'Si' then 
      update catalogo_grupo set registro = true where grupo = grupo_x;
    elseif valor = 'No' then 
      update catalogo_grupo set registro = false where grupo = grupo_x;
    end if;
  commit;
end$$

--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `bool_dosis` (`dosis` TINYINT, `fecha` DATE) RETURNS VARCHAR(40) CHARSET utf8mb4 BEGIN
declare valor varchar(40);
	if dosis = true then
    set valor = 'Efectuada';
  else
  if fecha != '' then
    set valor = 'Programada';
  else
    set valor = 'No asignada';
  end if;
  end if;
	RETURN valor;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `bool_vacuna` (`vacuna_x` VARCHAR(40)) RETURNS VARCHAR(40) CHARSET utf8mb4 BEGIN
declare valor varchar(40);
  
if vacuna_x != '' then
  set valor = vacuna_x;
else 
  set valor = 'No asignada';
end if;

	RETURN valor;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `completado` (`dpi_x` BIGINT(13), `vacuna_x` VARCHAR(40)) RETURNS VARCHAR(40) CHARSET utf8mb4 BEGIN
declare valor varchar(40);
declare numero int(11);
declare bool_x tinyint;


select ndosis into numero from catalogo_vacuna where vacuna = vacuna_x;
	
  
  if numero = 1 then
    select dosis1 into bool_x from historial where dpi = dpi_x;
    if bool_x = true then 
      set valor = 'Vacunación completada';
    else 
      set valor = 'Vacunación en proceso';
    end if;
  elseif numero = 2 then
    select dosis2 into bool_x from historial where dpi = dpi_x;
    if bool_x = true then 
      set valor = 'Vacunación completada';
    else 
      set valor = 'Vacunación en proceso';
    end if;
  elseif numero = 3 then 
    select dosis3 into bool_x from historial where dpi = dpi_x;
    if bool_x = true then 
      set valor = 'Vacunación completada';
    else 
      set valor = 'Vacunación en proceso';
    end if;
  end if;




	RETURN valor;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `porcentaje_enfermedad` (`enfermedad_x` VARCHAR(80), `dosis_x` VARCHAR(30)) RETURNS VARCHAR(100) CHARSET utf8mb4 BEGIN
declare total int(11);
declare division float;
declare texto varchar(100);

  select count(*) into total from usuario;
  if dosis_x = 'dosis1' then 
    select ((count(*)/total)*100) into division from historial h inner join enfermedad e on h.dpi = e.dpi  where h.dosis1 = true and e.enfermedad_cronica = enfermedad_x  group by e.enfermedad_cronica;
    set texto = ifnull(concat( enfermedad_x, ': ',division,'%'),concat( enfermedad_x, ': 0.00%'));
  elseif dosis_x = 'dosis2' then 
    select ((count(*)/total)*100) into division from historial h inner join enfermedad e on h.dpi = e.dpi  where h.dosis2 = true and e.enfermedad_cronica = enfermedad_x  group by e.enfermedad_cronica;
    set texto = ifnull(concat( enfermedad_x, ': ',division,'%'),concat( enfermedad_x, ': 0.00%'));
  elseif dosis_x = 'dosis3' then 
    select ((count(*)/total)*100) into division from historial h inner join enfermedad e on h.dpi = e.dpi  where h.dosis3 = true and e.enfermedad_cronica = enfermedad_x  group by e.enfermedad_cronica;
    set texto = ifnull(concat( enfermedad_x, ': ',division,'%'),concat( enfermedad_x, ': 0.00%'));
  end if;
	
	RETURN texto;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `ausencia_vacuna`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `ausencia_vacuna` (
`dpi` bigint(13)
,`nombre` varchar(60)
,`apellido` varchar(60)
,`centro` varchar(80)
,`vacuna` varchar(60)
,`dosis1_fecha` date
,`dosis2_fecha` date
,`refuerzo_fecha` date
,`dosis1` tinyint(1)
,`dosis2` tinyint(1)
,`dosis3` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_centro`
--

CREATE TABLE `catalogo_centro` (
  `Centro` varchar(80) NOT NULL,
  `disponible` tinyint(1) NOT NULL,
  `dias_asignacion` int(11) NOT NULL,
  `capacidad_diaria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `catalogo_centro`
--

INSERT INTO `catalogo_centro` (`Centro`, `disponible`, `dias_asignacion`, `capacidad_diaria`) VALUES
('CAMIP 1', 1, 9, 90),
('CAMIP 2 BARRANQUILLA', 1, 6, 70),
('CAMIP 3 Zunil', 1, 3, 40),
('Unidad Periférica Zona 11', 1, 14, 80);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_enfermedad`
--

CREATE TABLE `catalogo_enfermedad` (
  `enfermedad_cronica` varchar(80) NOT NULL,
  `registro` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `catalogo_enfermedad`
--

INSERT INTO `catalogo_enfermedad` (`enfermedad_cronica`, `registro`) VALUES
('Alzheimer', 1),
('Artritis', 1),
('Asma', 0),
('Cáncer', 1),
('Diabetes', 0),
('Epilepsia', 0),
('Esclerosis múltiple', 0),
('Fibrosis quística', 1),
('Otro', 0),
('Parkinson', 0),
('VIH/SIDA', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_grupo`
--

CREATE TABLE `catalogo_grupo` (
  `grupo` varchar(80) NOT NULL,
  `registro` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `catalogo_grupo`
--

INSERT INTO `catalogo_grupo` (`grupo`, `registro`) VALUES
('Educación infantil/especial', 0),
('Educación primaria/secundaria', 0),
('Fuerzas armadas', 0),
('Fuerzas de emergencia', 1),
('Fuerzas de seguridad', 1),
('Personal de primera linea', 1),
('Personal sanitario', 0),
('Residentes', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_vacuna`
--

CREATE TABLE `catalogo_vacuna` (
  `vacuna` varchar(60) NOT NULL,
  `disponibilidad` tinyint(1) NOT NULL,
  `ndosis` int(11) NOT NULL,
  `tiempo_dosis2` int(11) DEFAULT NULL,
  `tiempo_dosis3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `catalogo_vacuna`
--

INSERT INTO `catalogo_vacuna` (`vacuna`, `disponibilidad`, `ndosis`, `tiempo_dosis2`, `tiempo_dosis3`) VALUES
('Aztrazeneca', 0, 2, 28, 0),
('Jassen', 0, 1, 0, 0),
('Jorge', 1, 1, 0, 0),
('Moderna', 1, 3, 6, 121),
('Pfizer', 1, 3, 21, 120);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro_vacunacion`
--

CREATE TABLE `centro_vacunacion` (
  `dpi` bigint(20) NOT NULL,
  `centro` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centro_vacunacion`
--

INSERT INTO `centro_vacunacion` (`dpi`, `centro`) VALUES
(0, ''),
(1025, 'CAMIP 1'),
(1026, 'CAMIP 1'),
(1421, 'CAMIP 1'),
(1422, 'CAMIP 1'),
(1423, 'CAMIP 1'),
(1424, 'CAMIP 1'),
(1564, 'CAMIP 1'),
(1567, 'CAMIP 1'),
(4564, 'CAMIP 1'),
(11111, 'CAMIP 1'),
(65656, 'CAMIP 1'),
(7777777, 'CAMIP 1'),
(9876543, 'CAMIP 1'),
(12355555, 'CAMIP 1'),
(12377777, 'CAMIP 1'),
(55555555, 'CAMIP 1'),
(55555556, 'CAMIP 1'),
(123456789, 'CAMIP 1'),
(484848777, 'CAMIP 1'),
(918915616, 'CAMIP 1'),
(6666666666, 'CAMIP 1'),
(111111111111111, 'CAMIP 1'),
(8888, 'CAMIP 2'),
(48948, 'CAMIP 2'),
(789789, 'CAMIP 2 BARRANQUILLA'),
(12233, 'CAMIP 3 Zunil'),
(147852, 'CAMIP 3 Zunil'),
(44444555, 'CAMIP 3 Zunil'),
(78787878, 'CAMIP 3 Zunil'),
(24242, 'Municipalidad Fraijanes'),
(55555, 'Municipalidad Fraijanes'),
(1234567, 'Pradera Concepción'),
(122112, 'Unidad Periférica Zona 11'),
(445577, 'Unidad Periférica Zona 11'),
(996633, 'Unidad Periférica Zona 11'),
(1233321, 'Unidad Periférica Zona 11'),
(1231231231, 'Unidad Periférica Zona 11'),
(123, 'UNIS'),
(10101, 'UNIS'),
(66666, 'UNIS'),
(88888, 'UNIS'),
(99999, 'UNIS'),
(123456, 'UNIS'),
(125558, 'UNIS'),
(1231235645, 'UNIS'),
(300758332010, 'UNIS');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `cola_centro`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `cola_centro` (
`dpi` bigint(13)
,`fecha_registro` datetime
,`centro` varchar(80)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cola_vacuna`
--

CREATE TABLE `cola_vacuna` (
  `dpi` bigint(13) NOT NULL,
  `fecha_registro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cola_vacuna`
--

INSERT INTO `cola_vacuna` (`dpi`, `fecha_registro`) VALUES
(996633, '2021-10-26 22:50:17'),
(1026, '2021-10-29 12:28:33'),
(1422, '2021-10-29 12:28:33'),
(1423, '2021-10-29 12:30:46'),
(1424, '2021-10-29 12:30:46'),
(44444555, '2021-10-29 12:46:28'),
(445577, '2021-10-29 18:16:52'),
(1233321, '2021-10-29 20:15:08'),
(0, '2021-10-29 22:00:45'),
(122112, '2021-10-29 22:00:46');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `confirmacion`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `confirmacion` (
`dpi` bigint(13)
,`nombre` varchar(60)
,`apellido` varchar(60)
,`fecha_nacimiento` date
,`dpiVacuna` bigint(20)
,`vacuna` varchar(60)
,`dosis1_fecha` date
,`dosis2_fecha` date
,`refuerzo_fecha` date
,`dpiHistorial` bigint(13)
,`dosis1` tinyint(1)
,`dosis2` tinyint(1)
,`dosis3` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `dpi` bigint(20) NOT NULL,
  `telefono` int(11) NOT NULL,
  `email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`dpi`, `telefono`, `email`) VALUES
(0, 0, ''),
(123, 119, 'guerrero191096@unis.edu.gt'),
(1025, 124, 'koki2337@gmail.com'),
(1026, 124, 'csv@gmail.com'),
(1421, 123, 'koki2337@gmail.com'),
(1422, 123, 'csv@gmail.com'),
(1423, 123, 'csv@gmail.com'),
(1424, 124, 'csv@gmail.com'),
(1564, 123, 'koki2337@gmail.com'),
(1567, 124, 'koki2337@gmail.com'),
(4564, 123, 'koki2337@gmail.com'),
(8888, 124, 'koki2337@gmail.com'),
(10101, 456, 'koki2337@gmail.com'),
(11111, 123456, 'koki2337@gmail.com'),
(12233, 123, 'koki2337@gmail.com'),
(24242, 123, 'koki2337@gmail.com'),
(48948, 124, 'koki2337@gmail.com'),
(55555, 55555, 'koki2337@gmail.com'),
(65656, 123, 'koki2337@gmail.com'),
(66666, 66666, 'koki2337@gmail.com'),
(88888, 123, 'koki2337@gmail.com'),
(99999, 123, 'koki2337@gmail.com'),
(122112, 123, 'koki600@live.com'),
(123456, 123456, 'guerrero191096@unis.edu.gt'),
(125558, 123456, 'koki2337@gmail.com'),
(147852, 123, 'koki2337@gmail.com'),
(445577, 123, 'koki2337@gmail.com'),
(789789, 123, 'koki2337@gmail.com'),
(996633, 123, 'koki2337@gmail.com'),
(1233321, 123, 'koki2337@gmail.com'),
(1234567, 123456, 'guerrero191096@unis.edu.gt'),
(7777777, 4965, 'koki2337@gmail.com'),
(9876543, 494894, 'koki2337@gmail.com'),
(12355555, 123, 'koki2337@gmail.com'),
(12377777, 456, 'koki2337@gmail.com'),
(44444555, 123, 'koki2337@gmail.com'),
(55555555, 123, 'koki2337@gmail.com'),
(55555556, 123, 'koki2337@gmail.com'),
(78787878, 123, 'koki2337@gmail.com'),
(123456789, 123456, 'koki2337@gmail.com'),
(484848777, 19841985, 'koki2337@gmail.com'),
(918915616, 12312313, 'koki2337@gmail.com'),
(1231231231, 123, 'koki2337@gmail.com'),
(1231235645, 48484, 'koki2337@gmail.com'),
(6666666666, 49650426, 'koki2337@gmail.com'),
(300758332010, 0, 'koki2337@gmail.com'),
(3007583320101, 49650426, 'koki2337@gmail.com'),
(111111111111111, 49650426, 'koki2337@gmail.com');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `contacto_enfermedad`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `contacto_enfermedad` (
`dpi` bigint(13)
,`nombre` varchar(60)
,`apellido` varchar(60)
,`fecha_nacimiento` date
,`enfermedad_cronica` varchar(80)
,`dosis1` tinyint(1)
,`dosis2` tinyint(1)
,`dosis3` tinyint(1)
,`telefono` int(11)
,`email` varchar(80)
,`centro` varchar(80)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `contacto_enfermos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `contacto_enfermos` (
`dpi` bigint(13)
,`nombre` varchar(60)
,`apellido` varchar(60)
,`fecha_nacimiento` varchar(10)
,`enfermedad_cronica` varchar(80)
,`centro` varchar(80)
,`telefono` int(11)
,`email` varchar(80)
,`dosis1_fecha` varchar(10)
,`dosis2_fecha` varchar(10)
,`refuerzo_fecha` varchar(10)
,`dosis1` varchar(40)
,`dosis2` varchar(40)
,`dosis3` varchar(40)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido`
--

CREATE TABLE `contenido` (
  `elemento` varchar(255) NOT NULL,
  `nombre_imagen` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contenido`
--

INSERT INTO `contenido` (`elemento`, `nombre_imagen`, `titulo`, `contenido`, `url`) VALUES
('bloque1', 'noticia2.png', '49% de la población mundial ya ha sido vacunada', 'Recientes informes indican que aproximadamente un 49% de la población ya se ha logrado vacunar, donde paises como Estados Unidos ya casi se vacuna en su totalidad', 'https://www.w3schools.com/'),
('bloque2', 'noticia1.jpg', 'Nuevos equipos de Bioseguridad Gio', 'Recientes investigaciones permitieron el desarrollo de nuevos materiales los cuales tienen un mejor filtrado de aerosoles y un mejor paso del oxigeno, los cuales se están empezando a implementar en varios hospitales al rededor del mundo', 'https://www.prensalibre.com/'),
('bloque3', 'noticia3.jpeg', 'Se empezara a administrar la 3ra dosis de la vacuna Moderna en enero 2022 a nivel mundial', 'La OMS ha determinado que para mantener la efectividad de las vacunas ante las nuevas cepas, es necesario administrar las dosis de refuerzo lo mas pronto posible para evitar futuras mutaciones. La OMS ha realizado un comunicado solicitando a los fabricantes de las vacunas empezar la distribución de las nuevas dosis, donde la vacuna moderna es la única que ya tiene planeada su distribución en enero de 2022 ', 'https://es.reactjs.org/'),
('principal', 'principal.png', '', '123', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `data_cvs`
--

CREATE TABLE `data_cvs` (
  `dpi` bigint(20) NOT NULL,
  `clave` varchar(130) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo_usuario` int(11) NOT NULL,
  `telefono` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `centro` varchar(60) NOT NULL,
  `enfermedad` varchar(80) NOT NULL,
  `grupo` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `data_cvs`
--

INSERT INTO `data_cvs` (`dpi`, `clave`, `nombre`, `apellido`, `fecha_nacimiento`, `tipo_usuario`, `telefono`, `email`, `centro`, `enfermedad`, `grupo`) VALUES
(1025, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, 124, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(1026, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, 124, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(1421, 'abc', 'csv', 'csv', '2000-01-01', 1, 123, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(1422, 'abc', 'csv', 'csv', '2000-01-01', 1, 123, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(1423, 'abc', 'csv', 'csv', '2000-01-01', 1, 123, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(1424, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, 124, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(1564, 'abc', 'Gio', 'Leiva', '2000-01-01', 1, 123, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(1567, 'abc', 'name', 'last name', '2000-01-02', 2, 124, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(4564, 'abc', 'name', 'last name', '2000-01-01', 1, 123, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(8888, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, 124, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(48948, 'abc', 'name', 'last name', '2000-01-02', 2, 124, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes'),
(65656, 'abc', 'csv', 'csv', '2000-01-01', 1, 123, 'csv@gmail.com', 'CAMIP 1', 'Alzheimer', 'Residentes');

--
-- Disparadores `data_cvs`
--
DELIMITER $$
CREATE TRIGGER `import_csv` AFTER INSERT ON `data_cvs` FOR EACH ROW Begin
    insert into usuario (dpi ,clave, nombre, apellido, fecha_nacimiento, tipo_usuario, inscripcion, verificado) 
    
    values (
      New.dpi,
      New.clave,
      New.nombre,
      New.apellido,
      New.fecha_nacimiento,
      New.tipo_usuario,
      now(),
      true
    );
    
    insert into centro_vacunacion (dpi , centro ) 
    
    values (
      New.dpi,
      New.centro
    );
    
    insert into contacto (dpi , telefono, email ) 
    
    values (
      New.dpi,
      New.telefono,
      New.email
    );

    insert into vacuna( dpi, vacuna, dosis1_fecha, dosis2_fecha, refuerzo_fecha)
    
    values (
      New.dpi,
      '',
      '',
      '',
      ''
    );
    
    
    insert into historial( dpi, dosis1, dosis2, dosis3 )
    
    values (
      New.dpi,
      false,
      false,
      false
    );
    
    if New.enfermedad != '' then
    insert into enfermedad (dpi, enfermedad_cronica ) 
    values (
      New.dpi,
      New.enfermedad
    );
    end if;
    
    if New.grupo != '' then
    insert into grupo_prioritario (dpi, grupo ) 
    values (
      New.dpi,
      New.grupo
      
      
    );
    end if;
 end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `detalle_centro`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `detalle_centro` (
`dpi` bigint(20)
,`nombre` varchar(60)
,`apellido` varchar(60)
,`centro` varchar(80)
,`vacuna` varchar(60)
,`fecha` date
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edad_registro`
--

CREATE TABLE `edad_registro` (
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `edad_registro`
--

INSERT INTO `edad_registro` (`fecha`) VALUES
('2002-01-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedad`
--

CREATE TABLE `enfermedad` (
  `dpi` bigint(20) NOT NULL,
  `enfermedad_cronica` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `enfermedad`
--

INSERT INTO `enfermedad` (`dpi`, `enfermedad_cronica`) VALUES
(1025, 'Alzheimer'),
(1026, 'Alzheimer'),
(1421, 'Alzheimer'),
(1422, 'Alzheimer'),
(1423, 'Alzheimer'),
(1424, 'Alzheimer'),
(1564, 'Alzheimer'),
(1567, 'Alzheimer'),
(4564, 'Alzheimer'),
(8888, 'Alzheimer'),
(11111, 'Alzheimer'),
(48948, 'Alzheimer'),
(65656, 'Alzheimer'),
(125558, 'Alzheimer'),
(12355555, 'Alzheimer'),
(484848777, 'Alzheimer'),
(147852, 'Cáncer'),
(78787878, 'Epilepsia'),
(300758332010, 'Epilepsia'),
(55555, 'Otro'),
(1234567, 'Parkinson'),
(789789, 'VIH/SIDA'),
(9876543, 'VIH/SIDA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo_prioritario`
--

CREATE TABLE `grupo_prioritario` (
  `dpi` bigint(20) NOT NULL,
  `grupo` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `grupo_prioritario`
--

INSERT INTO `grupo_prioritario` (`dpi`, `grupo`) VALUES
(147852, 'Educación primaria/secundaria'),
(789789, 'Educación primaria/secundaria'),
(300758332010, 'Fuerzas armadas'),
(55555, 'Fuerzas de emergencia'),
(996633, 'Fuerzas de emergencia'),
(125558, 'maestro'),
(66666, 'Personal de primera linea'),
(1025, 'Residentes'),
(1026, 'Residentes'),
(1421, 'Residentes'),
(1422, 'Residentes'),
(1423, 'Residentes'),
(1424, 'Residentes'),
(1564, 'Residentes'),
(1567, 'Residentes'),
(4564, 'Residentes'),
(8888, 'Residentes'),
(11111, 'Residentes'),
(48948, 'Residentes'),
(65656, 'Residentes'),
(918915616, 'Residentes'),
(9876543, 'Resisdentes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `dpi` bigint(13) NOT NULL,
  `dosis1` tinyint(1) NOT NULL,
  `dosis2` tinyint(1) DEFAULT NULL,
  `dosis3` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`dpi`, `dosis1`, `dosis2`, `dosis3`) VALUES
(0, 0, 0, 0),
(1025, 0, 0, 0),
(1026, 0, 0, 0),
(1421, 0, 0, 0),
(1422, 0, 0, 0),
(1423, 0, 0, 0),
(1424, 0, 0, 0),
(1564, 1, 0, 0),
(1567, 1, 1, 1),
(4564, 0, 0, 0),
(8888, 0, 0, 0),
(10101, 1, 1, 0),
(11111, 0, 0, 0),
(12233, 0, 0, 0),
(24242, 0, 0, 0),
(48948, 0, 0, 0),
(55555, 0, 0, 0),
(65656, 0, 0, 0),
(66666, 0, 0, 0),
(88888, 0, 0, 0),
(99999, 0, 0, 0),
(122112, 0, 0, 0),
(125558, 1, 0, 0),
(147852, 1, 0, 0),
(445577, 0, 0, 0),
(789789, 1, 0, 0),
(996633, 0, 0, 0),
(1233321, 0, 0, 0),
(1234567, 1, 1, 0),
(7777777, 0, 0, 0),
(9876543, 0, 0, 0),
(12355555, 0, 0, 0),
(12377777, 0, 0, 0),
(44444555, 0, 0, 0),
(55555555, 0, 0, 0),
(55555556, 0, 0, 0),
(78787878, 0, 0, 0),
(123456789, 0, 0, 0),
(484848777, 0, 0, 0),
(918915616, 0, 0, 0),
(1231231231, 0, 0, 0),
(1231235645, 0, 0, 0),
(6666666666, 0, 0, 0),
(111111111111111, 1, 1, 0);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `historial_grupo`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `historial_grupo` (
`dpi` bigint(13)
,`nombre` varchar(60)
,`apellido` varchar(60)
,`fecha_nacimiento` varchar(10)
,`grupo` varchar(80)
,`dosis1_fecha` varchar(10)
,`dosis2_fecha` varchar(10)
,`refuerzo_fecha` varchar(10)
,`dosis1` varchar(40)
,`dosis2` varchar(40)
,`dosis3` varchar(40)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `nombre_imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`nombre_imagen`) VALUES
(''),
('2933245.png'),
('dummyframe.png'),
('noticia1.jpg'),
('noticia2.png'),
('noticia3.jpeg'),
('pacman.png'),
('principal.png'),
('prueba1.jpg'),
('prueba2.jpg');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `proceso`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `proceso` (
`dpi` bigint(13)
,`inscripcion` varchar(10)
,`vacuna` varchar(40)
,`dosis1_fecha` varchar(10)
,`dosis1` varchar(40)
,`dosis2_fecha` varchar(10)
,`dosis2` varchar(40)
,`refuerzo_fecha` varchar(10)
,`dosis3` varchar(40)
,`proceso` varchar(40)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_estado`
--

CREATE TABLE `registro_estado` (
  `codigo` bigint(20) UNSIGNED NOT NULL,
  `inscripcion` date NOT NULL,
  `vacuna` varchar(60) NOT NULL,
  `dosis1_fecha` date NOT NULL,
  `dosis1` varchar(60) NOT NULL,
  `dosis2_fecha` date NOT NULL,
  `dosis2` varchar(60) NOT NULL,
  `refuerzo_fecha` date NOT NULL,
  `dosis3` varchar(60) NOT NULL,
  `proceso` varchar(80) NOT NULL,
  `creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro_estado`
--

INSERT INTO `registro_estado` (`codigo`, `inscripcion`, `vacuna`, `dosis1_fecha`, `dosis1`, `dosis2_fecha`, `dosis2`, `refuerzo_fecha`, `dosis3`, `proceso`, `creacion`) VALUES
(10000000000000000000, '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '0000-00-00', '', '', '0000-00-00'),
(10000000000000000001, '2000-12-25', 'Moderna', '2020-05-25', 'Efectuada', '2020-05-25', 'Efectuada', '0000-00-00', '2020-05-25', 'Efectuada', '2021-10-23'),
(10000000000000000002, '2000-12-25', 'Moderna', '2020-05-25', 'Efectuada', '2020-05-25', 'Efectuada', '0000-00-00', 'Efectuada', 'Vacunacion completa', '2021-10-23'),
(10000000000000000003, '2000-12-25', 'Moderna', '2020-05-25', 'Efectuada', '2020-05-25', 'Efectuada', '0000-00-00', 'Efectuada', 'Vacunacion completa', '2021-10-23'),
(10000000000000000004, '2021-10-22', 'Moderna', '2021-10-23', 'Efectuada', '2021-10-28', 'Programada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-23'),
(10000000000000000005, '2021-10-22', 'Moderna', '2021-10-23', 'Efectuada', '2021-10-28', 'Programada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-23'),
(10000000000000000006, '2021-10-22', 'Moderna', '2021-10-04', 'Programada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-23'),
(10000000000000000007, '2021-10-22', 'Moderna', '2021-10-23', 'Efectuada', '2021-10-28', 'Programada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-24'),
(10044358857017344000, '2021-10-26', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-26'),
(10112576253817022000, '2021-10-22', 'Moderna', '2021-09-25', 'Programada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-29'),
(11632985384793006000, '2021-10-22', 'Moderna', '2021-10-15', 'Efectuada', '2021-11-05', 'Programada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-24'),
(11739749492835020000, '2021-10-26', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-26'),
(12960236440375669000, '2021-10-26', 'No asignada', '2021-10-29', 'Programada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-26'),
(13609306472921098000, '2021-10-22', 'Moderna', '2021-10-23', 'Efectuada', '2021-10-28', 'Programada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-24'),
(13667347874182600000, '2021-10-22', 'Moderna', '2021-11-04', 'Efectuada', '2021-10-28', 'Efectuada', '2022-02-24', 'Programada', 'Vacunación en proceso', '2021-10-26'),
(13733718674381933000, '2021-10-24', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-24'),
(14631401669822075000, '2021-10-22', 'Moderna', '2021-11-04', 'Efectuada', '2021-10-28', 'Efectuada', '2022-02-24', 'Programada', 'Vacunación en proceso', '2021-10-29'),
(14660449635852546000, '2021-10-22', 'Moderna', '2021-10-23', 'Efectuada', '2021-10-28', 'Programada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-24'),
(14976328630909630000, '2021-10-24', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-24'),
(17755873657535644000, '2021-10-26', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-26'),
(17884430788349762000, '2021-10-24', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', '0000-00-00', 'No asignada', 'Vacunación en proceso', '2021-10-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `dpi` bigint(13) NOT NULL,
  `clave` varchar(130) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo_usuario` int(11) NOT NULL,
  `inscripcion` date NOT NULL,
  `verificado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`dpi`, `clave`, `nombre`, `apellido`, `fecha_nacimiento`, `tipo_usuario`, `inscripcion`, `verificado`) VALUES
(0, '$2y$10$TxA1/c9E/VQhki1hEEY3M.PpTdP4lYEMOBpXu58/qpmCxH3DEBP2C', '', '', '0000-00-00', 0, '2021-10-29', 1),
(123, '$2y$10$59d9d0gWt8ct9O7dYDy2xuh3vCCbMZZEYaJjDpqeT4do5tqhNYA2m', '123', '789', '2000-12-21', 3, '2021-10-22', 1),
(757, '$2y$10$za3690ce4coiEOIlhu1HBO/gli/fDWvIyXffT/NnMYeUfoFiQDzBq', 'prueba', 'php', '1990-09-19', 3, '2021-10-22', 1),
(987, '$2y$10$7QyDjOZnRXEnAEI2eZKWcuP0Gh1YXH8rSi1Q871iTppL2JK1nYKSa', 'prueba', 'php', '1990-09-19', 1, '2021-10-22', 1),
(1025, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, '2021-10-22', 1),
(1026, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, '2021-10-29', 1),
(1421, 'abc', 'csv', 'csv', '2000-01-01', 1, '2021-10-22', 1),
(1422, 'abc', 'csv', 'csv', '2000-01-01', 1, '2021-10-29', 1),
(1423, 'abc', 'csv', 'csv', '2000-01-01', 1, '2021-10-29', 1),
(1424, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, '2021-10-29', 1),
(1564, 'abc', 'Gio', 'Leiva', '2000-01-01', 1, '2021-10-22', 1),
(1567, '$2y$10$NOobCxy7Ib6a/6228WR3EuinG3.nXEOV98IpP95ETMEH4x5Mq3BYq', 'name', 'last name', '2000-01-02', 2, '2021-10-22', 1),
(4564, 'abc', 'name', 'last name', '2000-01-01', 1, '2021-10-22', 1),
(7575, '$2y$10$kfZxw0zxM3Dtt6AQfG3uj.QOSsff6gTJMQkerKk5xO50/H.wBsoC.', 'prueba', 'php', '1990-09-19', 1, '2021-10-22', 1),
(8888, 'abc', 'jijiji', 'yyfygy', '2000-01-02', 2, '2021-10-22', 1),
(10101, '$2y$10$RPV3eI9Ohg3qkdZVUDZ8d.VdQLWy/8D4pFqjAv8kUdpuDEaP2zfGW', 'Gio', 'Leiva', '1970-01-01', 1, '2021-10-22', 1),
(11111, 'clave123', 'agusto', 'perez', '2000-01-31', 1, '2021-10-22', 1),
(12233, '$2y$10$w1BzBn2wRxloM4ViguiKde2d6VYlmGoRhdH2jdk9S.k2aYlGroLo.', 'Luffy', 'Prueba', '1995-01-01', 1, '2021-10-26', 1),
(24242, '$2y$10$NOobCxy7Ib6a/6228WR3EuinG3.nXEOV98IpP95ETMEH4x5Mq3BYq', 'Adriana ', 'Solares', '0000-00-00', 2, '2021-10-22', 1),
(48948, 'abc', 'name', 'last name', '2000-01-02', 2, '2021-10-22', 1),
(55555, '$2y$10$ungn4JjyWCTNTbndDyjTGO2euTsTib7lIhFOJCpzns2/EhqyhcVGW', 'Juanito', 'Perez', '2001-12-25', 1, '2021-10-22', 1),
(65656, 'abc', 'csv', 'csv', '2000-01-01', 1, '2021-10-22', 1),
(66666, '$2y$10$Xfw5GCngmEzYoJCbJgfszeq8AIMTAK/a267zt4WiklfICaQJ5hyZ.', 'Antonio', 'Salazar', '1965-06-14', 1, '2021-10-22', 1),
(75757, '$2y$10$nStRcnBIGJchbCCB/V1cX.wZs2v.xaXDQ4Vy5xhS4rrbG329NCHk.', 'prueba', 'php', '1990-09-19', 1, '2021-10-22', 1),
(88888, '$2y$10$gf9UbMJY55nLYaRum5WG8Ou3FqckQEl4J.yYlAmVhNL/xmR2IvJk2', 'Armando', 'Casas', '1991-05-14', 3, '2021-10-22', 1),
(99999, '$2y$10$2EmJLCTRpDW7rhqz.AQySOVMWwHmK6jvP5qk2xIl6qrerRIeZEbga', 'Felicia', 'Flores', '1997-04-25', 2, '2021-10-22', 1),
(122112, '$2y$10$3b6MwjL3SD.19Von3PKP7u9ixF/zPP2bHnFGNrgZJls6yclm9cyiW', 'Pedro', 'Asturias', '1990-01-01', 1, '2021-10-29', 1),
(123456, '$2y$10$j2kS0FfQQ2lie6vzFzFGf.QPFis/NVaS10h7H.wf5FQZ1M/K12RP6', 'prueba', 'prueba', '1996-01-01', 1, '2021-10-22', 1),
(125558, 'clave123', 'agusto', 'perez', '2000-01-31', 1, '2021-10-22', 1),
(147852, '$2y$10$E4j5pjXHLjKmqzzxOIaQWOyrWtgJ.G45rmnihkFh5WlwG0ipqL57K', 'prueba', 'cola', '2002-02-01', 1, '2021-10-26', 1),
(445577, '$2y$10$i7pXLfYFRYLG0nSCrAjF4eBeuTsi4WXCf3KU/xOfdeD97CCbwa8Qa', 'Pepito', 'Cuevas', '1998-01-01', 1, '2021-10-29', 1),
(789789, '$2y$10$SVJuIRUM0h.5E8IeRFQdYegXR5.orHR1Q.WLMQm4U9SAaIxiEjh2G', 'prueba2', 'prueba2', '1985-12-14', 1, '2021-10-22', 1),
(996633, '$2y$10$8fBcUX44GNmCNG1gysEBTu0zqW9UL2ix3ujfFadx5ut9DTBzefNEG', 'Silvana', 'Aurelia', '2002-02-01', 1, '2021-10-26', 1),
(1233321, '$2y$10$awG07SL7VvPRecZ8iq7HJOSZwmFlMz.0UsvEkw2/D0CO0BC4XJ89G', 'Adriana', 'Esperanza', '1984-03-14', 1, '2021-10-29', 1),
(1234567, '$2y$10$WPYrHRWGS4FFKqRfD4MxW.IjTyRbW8WUDEgNyChO9dqZZ1jOOpbGq', 'Alfonso', 'Morales', '1974-08-12', 1, '2021-10-22', 1),
(7777777, '$2y$10$sf.VmHWfhlmiroEZFEu0UujHOVrk/BNVYZ4Gx25tSz1T5N.x3CIiK', 'Jorge', 'Guerrero', '1996-08-21', 1, '2021-10-24', 1),
(9876543, '$2y$10$G2Ip3.tYUG1Mnk.FPUoDe.aoZ4YHNNHZNFr5qd6ugDPn7Ugp5noBS', 'empleado', 'prueba', '1958-12-21', 2, '2021-10-22', 1),
(12355555, '$2y$10$TcraRveCOqxZIsZdXeY.cucVEWWCG/vZlvdWAki.XYUm2BHAawdfC', 'Jorge', 'abc', '1993-02-01', 1, '2021-10-24', 1),
(12377777, '$2y$10$wwYiCnyE67ykfz5r4OH2e.1AaOvYdvuCcolLEhymykZNGIWcTldLy', 'jorge', 'empleado', '1998-10-15', 2, '2021-10-26', 1),
(44444555, '$2y$10$zmfUdkNYwjGnHwtTT0m3fuPPBQB4yIrGfRkciaGs5yRnWhflyT8xW', 'Juan', 'Fernandez', '1995-01-01', 2, '2021-10-29', 1),
(55555555, '$2y$10$uRf2342zb.iMy4rgvH.UnO4hMYSzQA1dXguRw5buLXn2VOqIn9OsS', 'Prueba', 'Prueba', '1995-01-01', 1, '2021-10-24', 1),
(55555556, '$2y$10$/xsSkmR/MIMn7m2UXdbvTuDMAvkV5EllgBHnBJb594BueJrX2Ti3m', 'Prueba', 'Prueba', '1995-01-01', 1, '2021-10-24', 1),
(75757575, '$2y$10$jpigstu82IdEGPstJK9Fm.ePdNhn/HlGaAEY9sxSsKOO0vkLPrGLO', 'prueba', 'php', '1990-09-19', 1, '2021-10-22', 1),
(78787878, '$2y$10$NbL/5p3qAOUi91npuVh9..COi./.Ix6qKGxn66/XrzUYjJYsIQRlm', 'usuario normal', 'usuario normal', '1995-05-19', 1, '2021-10-22', 1),
(123456789, 'clave123', 'agusto', 'perez', '2000-01-31', 1, '2021-10-22', 1),
(484848777, '$2y$10$LFRgrWMgYP4bY86dlhPAZun.yk..19JSANVmhxgc7h.pDUAMIYOfe', 'prueba', 'dfafdsafd', '1999-07-15', 1, '2021-10-22', 1),
(757575755, '$2y$10$Jm.9KJYwEx1V2NDNvDgs6.q7QV75G/7uVEK/eGm4yjIilaPqIe3ZS', 'prueba', 'php', '1990-09-19', 1, '2021-10-22', 1),
(918915616, '$2y$10$av3go41RPBqjfMpcn/fNV.ARDHoKiEpNQ9S.Z/vyYQsX8PsuQPV1C', 'fdadfafd', 'fdsafdsaf', '1999-05-15', 1, '2021-10-22', 1),
(1231231231, '$2y$10$MGvWCjI7ocx/TKqjHIMPc.EWidUTTToKUuUEnYysJ9OLTxbIKyeaC', 'Arturo', 'Cuevas', '2002-01-01', 2, '2021-10-26', 1),
(1231235645, '$2y$10$NSzpksWAA6CLzDWKz.7gluldc/QgS0.1O9dUAP9rBKwsRKRSxhbT6', '123123123', '454848', '0000-00-00', 1, '2021-10-22', 1),
(6666666666, '$2y$10$Z6xusanlvPKwM3eDQCrV8uu.EbCW48Kh3e4dzxGtPkJ0T3pVa2Dze', 'Jorge', 'Prueba', '1992-07-19', 1, '2021-10-24', 1),
(7575757554, '$2y$10$ganuyVVR5tlRnqnkJRRaqezu18Mwek5jQigvFLLngqfTdeQ4P3N1S', 'prueba', 'php', '1990-09-19', 1, '2021-10-22', 1),
(300758332010, '$2y$10$No6leri3DXieLzu8IH.Jh.QplZWqKIXxKsXgLcdb.5XLOfucS4L36', '123', '123', '1999-01-01', 1, '2021-10-22', 1),
(3007583320101, '$2y$10$FRcsor4X9UHLiUjQ3BqSZe0vnWF/lSH79tLM1kqHSfLcHr8CfY27i', 'Jorge Eduardo', 'Guerrero Garcia', '2000-08-21', 3, '2021-10-22', 1),
(111111111111111, '$2y$10$7qEnB67Wye8v9TBVltFLjOx9T5zlf2JK7hoz/bempC1mX/OQ5yVv2', 'Jorge Eduardo', 'Guerrero Garcia', '2000-08-21', 3, '2021-10-22', 1);

--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `cola_vacuna` AFTER INSERT ON `usuario` FOR EACH ROW BEGIN
    INSERT INTO cola_vacuna (dpi, fecha_registro) 
    VALUES (NEW.dpi , now());
 END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

CREATE TABLE `vacuna` (
  `dpi` bigint(20) NOT NULL,
  `vacuna` varchar(60) NOT NULL,
  `dosis1_fecha` date NOT NULL,
  `dosis2_fecha` date DEFAULT NULL,
  `refuerzo_fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vacuna`
--

INSERT INTO `vacuna` (`dpi`, `vacuna`, `dosis1_fecha`, `dosis2_fecha`, `refuerzo_fecha`) VALUES
(0, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(123, 'Moderna', '2021-09-22', '2021-10-20', '2021-11-17'),
(1025, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(1026, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(1421, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(1422, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(1423, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(1424, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(1564, 'Moderna', '2021-11-04', '0000-00-00', '0000-00-00'),
(1567, 'Moderna', '2021-11-04', '2021-10-22', '2021-10-25'),
(4564, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(8888, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(10101, 'Moderna', '2021-10-05', '2021-11-05', '2022-02-13'),
(11111, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(12233, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(24242, 'Moderna', '2021-10-04', '0000-00-00', '0000-00-00'),
(48948, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(55555, 'Moderna', '2021-09-25', '0000-00-00', '0000-00-00'),
(65656, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(66666, 'Moderna', '2021-09-05', '2021-09-25', '0000-00-00'),
(88888, 'Moderna', '2021-10-04', '0000-00-00', '0000-00-00'),
(99999, 'Moderna', '2021-10-04', '0000-00-00', '0000-00-00'),
(122112, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(123456, 'Moderna', '2021-10-02', '0000-00-00', '2022-05-24'),
(125558, 'Moderna', '2021-09-22', '2021-09-24', '2022-06-20'),
(147852, 'Pfizer', '2021-10-30', '2021-11-19', '0000-00-00'),
(445577, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(789789, 'Moderna', '2021-10-15', '2021-11-05', '0000-00-00'),
(996633, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(1233321, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(1234567, 'Moderna', '2021-09-21', '2021-09-22', '2022-06-20'),
(7777777, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(9876543, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(12355555, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(12377777, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(44444555, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(55555555, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(55555556, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(78787878, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(123456789, '', '2021-11-04', '2021-10-19', '2021-10-20'),
(484848777, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(918915616, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(1231231231, '', '0000-00-00', '0000-00-00', '0000-00-00'),
(1231235645, 'Moderna', '2021-10-04', '0000-00-00', '0000-00-00'),
(6666666666, '', '2021-11-04', '0000-00-00', '0000-00-00'),
(300758332010, 'Moderna', '2021-10-01', '0000-00-00', '0000-00-00'),
(111111111111111, 'Moderna', '2021-11-04', '2021-10-28', '2022-02-24');

-- --------------------------------------------------------

--
-- Estructura para la vista `ausencia_vacuna`
--
DROP TABLE IF EXISTS `ausencia_vacuna`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ausencia_vacuna`  AS SELECT `u`.`dpi` AS `dpi`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, `c`.`centro` AS `centro`, `v`.`vacuna` AS `vacuna`, `v`.`dosis1_fecha` AS `dosis1_fecha`, `v`.`dosis2_fecha` AS `dosis2_fecha`, `v`.`refuerzo_fecha` AS `refuerzo_fecha`, `h`.`dosis1` AS `dosis1`, `h`.`dosis2` AS `dosis2`, `h`.`dosis3` AS `dosis3` FROM (((`usuario` `u` join `centro_vacunacion` `c` on(`u`.`dpi` = `c`.`dpi`)) join `vacuna` `v` on(`u`.`dpi` = `v`.`dpi`)) join `historial` `h` on(`u`.`dpi` = `h`.`dpi`)) WHERE `v`.`vacuna` <> '' ;

-- --------------------------------------------------------

--
-- Estructura para la vista `cola_centro`
--
DROP TABLE IF EXISTS `cola_centro`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cola_centro`  AS SELECT `v`.`dpi` AS `dpi`, `v`.`fecha_registro` AS `fecha_registro`, `c`.`centro` AS `centro` FROM (`cola_vacuna` `v` join `centro_vacunacion` `c` on(`v`.`dpi` = `c`.`dpi`)) ORDER BY `c`.`centro` ASC, `v`.`fecha_registro` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `confirmacion`
--
DROP TABLE IF EXISTS `confirmacion`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `confirmacion`  AS SELECT `u`.`dpi` AS `dpi`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, `u`.`fecha_nacimiento` AS `fecha_nacimiento`, `v`.`dpi` AS `dpiVacuna`, `v`.`vacuna` AS `vacuna`, `v`.`dosis1_fecha` AS `dosis1_fecha`, `v`.`dosis2_fecha` AS `dosis2_fecha`, `v`.`refuerzo_fecha` AS `refuerzo_fecha`, `h`.`dpi` AS `dpiHistorial`, `h`.`dosis1` AS `dosis1`, `h`.`dosis2` AS `dosis2`, `h`.`dosis3` AS `dosis3` FROM ((`usuario` `u` join `vacuna` `v` on(`u`.`dpi` = `v`.`dpi`)) join `historial` `h` on(`u`.`dpi` = `h`.`dpi`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `contacto_enfermedad`
--
DROP TABLE IF EXISTS `contacto_enfermedad`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `contacto_enfermedad`  AS SELECT `u`.`dpi` AS `dpi`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, `u`.`fecha_nacimiento` AS `fecha_nacimiento`, `e`.`enfermedad_cronica` AS `enfermedad_cronica`, `h`.`dosis1` AS `dosis1`, `h`.`dosis2` AS `dosis2`, `h`.`dosis3` AS `dosis3`, `c`.`telefono` AS `telefono`, `c`.`email` AS `email`, `v`.`centro` AS `centro` FROM ((((`usuario` `u` join `enfermedad` `e` on(`u`.`dpi` = `e`.`dpi`)) join `historial` `h` on(`u`.`dpi` = `h`.`dpi`)) join `contacto` `c` on(`u`.`dpi` = `c`.`dpi`)) join `centro_vacunacion` `v` on(`u`.`dpi` = `v`.`dpi`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `contacto_enfermos`
--
DROP TABLE IF EXISTS `contacto_enfermos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `contacto_enfermos`  AS SELECT `u`.`dpi` AS `dpi`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, date_format(`u`.`fecha_nacimiento`,'%e/%m/%Y') AS `fecha_nacimiento`, `en`.`enfermedad_cronica` AS `enfermedad_cronica`, `ce`.`centro` AS `centro`, `co`.`telefono` AS `telefono`, `co`.`email` AS `email`, date_format(`v`.`dosis1_fecha`,'%e/%m/%Y') AS `dosis1_fecha`, date_format(`v`.`dosis2_fecha`,'%e/%m/%Y') AS `dosis2_fecha`, date_format(`v`.`refuerzo_fecha`,'%e/%m/%Y') AS `refuerzo_fecha`, `bool_dosis`(`h`.`dosis1`,`v`.`dosis1_fecha`) AS `dosis1`, `bool_dosis`(`h`.`dosis2`,`v`.`dosis2_fecha`) AS `dosis2`, `bool_dosis`(`h`.`dosis3`,`v`.`refuerzo_fecha`) AS `dosis3` FROM (((((`usuario` `u` join `enfermedad` `en` on(`u`.`dpi` = `en`.`dpi`)) join `centro_vacunacion` `ce` on(`u`.`dpi` = `ce`.`dpi`)) join `contacto` `co` on(`u`.`dpi` = `co`.`dpi`)) join `vacuna` `v` on(`u`.`dpi` = `v`.`dpi`)) join `historial` `h` on(`u`.`dpi` = `h`.`dpi`)) ORDER BY `ce`.`centro` ASC, `en`.`enfermedad_cronica` ASC, `u`.`dpi` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `detalle_centro`
--
DROP TABLE IF EXISTS `detalle_centro`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `detalle_centro`  AS SELECT `u`.`dpi` AS `dpi`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, `c`.`centro` AS `centro`, `v`.`vacuna` AS `vacuna`, `v`.`dosis1_fecha` AS `fecha` FROM (((`usuario` `u` join `centro_vacunacion` `c` on(`u`.`dpi` = `c`.`dpi`)) join `vacuna` `v` on(`u`.`dpi` = `v`.`dpi`)) join `historial` `h` on(`u`.`dpi` = `h`.`dpi`)) WHERE `h`.`dosis1` = 1 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `historial_grupo`
--
DROP TABLE IF EXISTS `historial_grupo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `historial_grupo`  AS SELECT `u`.`dpi` AS `dpi`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, date_format(`u`.`fecha_nacimiento`,'%e/%m/%Y') AS `fecha_nacimiento`, `g`.`grupo` AS `grupo`, date_format(`v`.`dosis1_fecha`,'%e/%m/%Y') AS `dosis1_fecha`, date_format(`v`.`dosis2_fecha`,'%e/%m/%Y') AS `dosis2_fecha`, date_format(`v`.`refuerzo_fecha`,'%e/%m/%Y') AS `refuerzo_fecha`, `bool_dosis`(`h`.`dosis1`,`v`.`dosis1_fecha`) AS `dosis1`, `bool_dosis`(`h`.`dosis2`,`v`.`dosis2_fecha`) AS `dosis2`, `bool_dosis`(`h`.`dosis3`,`v`.`refuerzo_fecha`) AS `dosis3` FROM (((`usuario` `u` join `grupo_prioritario` `g` on(`u`.`dpi` = `g`.`dpi`)) join `vacuna` `v` on(`u`.`dpi` = `v`.`dpi`)) join `historial` `h` on(`u`.`dpi` = `h`.`dpi`)) ORDER BY `g`.`grupo` ASC, `u`.`dpi` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `proceso`
--
DROP TABLE IF EXISTS `proceso`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proceso`  AS SELECT `u`.`dpi` AS `dpi`, date_format(`u`.`inscripcion`,'%e/%m/%Y') AS `inscripcion`, `bool_vacuna`(`v`.`vacuna`) AS `vacuna`, date_format(`v`.`dosis1_fecha`,'%e/%m/%Y') AS `dosis1_fecha`, `bool_dosis`(`h`.`dosis1`,`v`.`dosis1_fecha`) AS `dosis1`, date_format(`v`.`dosis2_fecha`,'%e/%m/%Y') AS `dosis2_fecha`, `bool_dosis`(`h`.`dosis2`,`v`.`dosis2_fecha`) AS `dosis2`, date_format(`v`.`refuerzo_fecha`,'%e/%m/%Y') AS `refuerzo_fecha`, `bool_dosis`(`h`.`dosis3`,`v`.`refuerzo_fecha`) AS `dosis3`, ifnull(`completado`(`u`.`dpi`,`v`.`vacuna`),'Vacunación en proceso') AS `proceso` FROM ((`usuario` `u` join `vacuna` `v` on(`u`.`dpi` = `v`.`dpi`)) join `historial` `h` on(`u`.`dpi` = `h`.`dpi`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catalogo_centro`
--
ALTER TABLE `catalogo_centro`
  ADD PRIMARY KEY (`Centro`);

--
-- Indices de la tabla `catalogo_enfermedad`
--
ALTER TABLE `catalogo_enfermedad`
  ADD PRIMARY KEY (`enfermedad_cronica`);

--
-- Indices de la tabla `catalogo_grupo`
--
ALTER TABLE `catalogo_grupo`
  ADD PRIMARY KEY (`grupo`);

--
-- Indices de la tabla `catalogo_vacuna`
--
ALTER TABLE `catalogo_vacuna`
  ADD PRIMARY KEY (`vacuna`);

--
-- Indices de la tabla `centro_vacunacion`
--
ALTER TABLE `centro_vacunacion`
  ADD PRIMARY KEY (`dpi`),
  ADD KEY `centro` (`centro`);

--
-- Indices de la tabla `cola_vacuna`
--
ALTER TABLE `cola_vacuna`
  ADD PRIMARY KEY (`dpi`),
  ADD KEY `fecha_registro` (`fecha_registro`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`dpi`),
  ADD KEY `telefono` (`telefono`),
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `contenido`
--
ALTER TABLE `contenido`
  ADD PRIMARY KEY (`elemento`);

--
-- Indices de la tabla `data_cvs`
--
ALTER TABLE `data_cvs`
  ADD PRIMARY KEY (`dpi`);

--
-- Indices de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  ADD PRIMARY KEY (`dpi`),
  ADD KEY `enfermedad_ibfk_1` (`enfermedad_cronica`);

--
-- Indices de la tabla `grupo_prioritario`
--
ALTER TABLE `grupo_prioritario`
  ADD PRIMARY KEY (`dpi`),
  ADD KEY `grupo` (`grupo`) USING HASH;

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`dpi`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`nombre_imagen`);

--
-- Indices de la tabla `registro_estado`
--
ALTER TABLE `registro_estado`
  ADD PRIMARY KEY (`codigo`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`dpi`),
  ADD KEY `dpi` (`dpi`);

--
-- Indices de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD PRIMARY KEY (`dpi`),
  ADD KEY `vacuna` (`vacuna`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `registro_estado`
--
ALTER TABLE `registro_estado`
  MODIFY `codigo` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9223372036854775807;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `centro_vacunacion`
--
ALTER TABLE `centro_vacunacion`
  ADD CONSTRAINT `centro_vacunacion_ibfk_1` FOREIGN KEY (`dpi`) REFERENCES `usuario` (`dpi`);

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`dpi`) REFERENCES `usuario` (`dpi`);

--
-- Filtros para la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  ADD CONSTRAINT `enfermedad_ibfk_1` FOREIGN KEY (`enfermedad_cronica`) REFERENCES `catalogo_enfermedad` (`enfermedad_cronica`),
  ADD CONSTRAINT `enfermedad_ibfk_2` FOREIGN KEY (`enfermedad_cronica`) REFERENCES `catalogo_enfermedad` (`enfermedad_cronica`);

--
-- Filtros para la tabla `grupo_prioritario`
--
ALTER TABLE `grupo_prioritario`
  ADD CONSTRAINT `grupo_prioritario_ibfk_1` FOREIGN KEY (`dpi`) REFERENCES `usuario` (`dpi`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`dpi`) REFERENCES `usuario` (`dpi`);

--
-- Filtros para la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD CONSTRAINT `vacuna_ibfk_1` FOREIGN KEY (`dpi`) REFERENCES `usuario` (`dpi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
