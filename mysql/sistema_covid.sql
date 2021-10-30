use sistema_covid;
select * from usuario;



select * from confirmacion;

drop procedure borrar_usuario;
Create procedure borrar_usuario(in dpi_x bigint(13))
begin
  start transaction;
    delete from centro_vacunacion where dpi = dpi_x;
    delete from contacto where dpi = dpi_x;
    delete from grupo_prioritario where dpi = dpi_x;
    delete from enfermedad where dpi = dpi_x;
    delete from vacuna where dpi = dpi_x;
    delete from historial where dpi = dpi_x;
    delete from usuario where dpi = dpi_x;
    
  commit;
end;
call borrar_usuario(123);

select * from grupo_prioritario;

drop procedure registro;

create PROCEDURE registro(in dpi_x bigint(13), 
                          in clave_x varchar(130),
                          in nombre_x varchar(60),
                          in apellido_x varchar(60),
                          in fecha_nacimiento_x date,
                          in tipo_usuario_x int(11),
                          in telefono_x int(11),
                          in email_x varchar(80),
                          in centro_x varchar(60),
                          in enfermedad_x varchar(80),
                          in grupo_x varchar(80)
                          )
begin
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
  
end;




commit;

drop trigger cola_vacuna;

CREATE TRIGGER cola_vacuna AFTER 
INSERT ON usuario 
 	FOR EACH ROW
 BEGIN
    INSERT INTO cola_vacuna (dpi, fecha_registro) 
    VALUES (NEW.dpi , now());
 END;
 
 
 drop trigger import_csv;
 
 create trigger import_csv after
 insert on data_cvs
  for each row
 Begin
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
 end;
 
 
 delete from cola_vacuna;
 

rollback;
select * from vacuna;
select * from usuario;
select * from contacto;
select * FROM enfermedad;
select * from grupo_prioritario;

select  date(now());

call registro('11112','clave123','agusto','perez','2000-1-31','1','123456','prueba@gmail.com','CAMIP 1','Alheimer','Residentes');

update usuario set fecha_nacimiento = '2000-8-21';
update vacuna set dosis1_fecha = now() where dpi = 1234567 ;
commit;

select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
inner join vacuna v on u.dpi = v.dpi 
inner join centro_vacunacion c on u.dpi = c.dpi  
where ( v.dosis1_fecha = date(now()) or v.dosis2_fecha = date(now()) or
v.refuerzo_fecha =  date(now())) and u.dpi = '125558' and c.centro = 'unis';

select * from confirmacion;
commit;
drop procedure asignacion_dosis;

create procedure asignacion_dosis(in dpi_x bigint(13),
                          in dosis varchar(60)
                          )
begin
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
end;


rollback;
select * FROM vacuna;
select * from historial;
call asignacion_dosis(123456, 'Janssen' );


create view confirmacion as
select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , 
v.dpi as dpiVacuna, v.vacuna, v.dosis1_fecha,v.dosis2_fecha, v.refuerzo_fecha ,
h.dpi as dpiHistorial, h.dosis1,h.dosis2,h.dosis3
from usuario u
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi;




select * from confirmacion where dpi = 66666   and (dosis1_fecha between now() and DATE_ADD(now() , INTERVAL 7 day)
                                               or dosis2_fecha between now() and DATE_ADD(now() , INTERVAL 7 day)
                                               or refuerzo_fecha between now() and DATE_ADD(now() , INTERVAL 7 day));



drop procedure confirmar_dosis;

select * from vacuna;
select * from catalogo_vacuna;
select * from historial;

create procedure confirmar_dosis(dpi_x bigint(13))
begin
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
end;

rollback;
call confirmar_dosis( 10101);



select * from vacuna;
select * from historial;

commit;




drop procedure cambiarUsuario;

create procedure cambiarUsuario(in dpi_x bigint(13),
                                in tipo_usuario_x varchar(60))
Begin
  start transaction;
    update usuario set tipo_usuario = tipo_usuario_x where dpi = dpi_x;
  
  commit;

end;


rollback;

select * from usuario;
call cambiarUsuario('757','3');


commit;



select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
  inner join vacuna v on u.dpi = v.dpi 
  inner join centro_vacunacion c on u.dpi = c.dpi  
  where ( v.dosis1_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) 
          or v.dosis2_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) 
          or v.refuerzo_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) );


select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
  inner join vacuna v on u.dpi = v.dpi 
  inner join centro_vacunacion c on u.dpi = c.dpi  
  where ( v.dosis1_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) 
          or v.dosis2_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) 
          or v.refuerzo_fecha between now() and DATE_ADD(now() , INTERVAL 7 day) )
          ;
          
          commit;
          
          
          
update vacuna set vacuna.refuerzo_fecha = '' where dpi = 66666;
update historial set dosis1 = true where dpi = 66666;
select * from confirmacion;
select * from centro_vacunacion;
commit;
select * from usuario;

select * from confirmacion;




select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
  inner join vacuna v on u.dpi = v.dpi 
  inner join centro_vacunacion c on u.dpi = c.dpi  
  where ( (v.dosis1_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day)) 
          or (v.dosis2_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day)) 
          or (v.refuerzo_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day)) )
;
  
  
drop procedure cambio_atributos;
create procedure cambio_atributos(in dpi_x bigint(13),
                                in atributo varchar(60),
                                in valor varchar(80))
Begin
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
  
  
  
  
end;
rollback;

commit;
select * from usuario;
select * from grupo_prioritario;

call cambio_atributos( 123, 'feimiet' , '21/12/2000');


/*

  if atributo = 'nombre' then
   update usuario set nombre = valor where dpi = dpi_x;
  end if; 
  if atributo = 'apellido' then
   update usuario set apellido = valor where dpi = dpi_x;
  end if;
  if atributo = 'fecha_nacimiento' then
   update usuario set fecha_nacimiento = valor where dpi = dpi_x;
  end if;
  if atributo = 'telefono' then
   update contacto set telefono = valor where dpi = dpi_x;
  end if;
  if atributo = 'email' then
   update contacto set email = valor where dpi = dpi_x;
  end if;
  if atributo = 'enfermedad_cronica' then
   update enfermedad set enfermedad_cronica = valor where dpi = dpi_x;
  end if;
  
  if atributo = 'grupo' then
   update grupo_prioritario set grupo = valor where dpi = dpi_x;
  end if;

*/

select * from usuario;







drop procedure nuevo_centro;

create procedure nuevo_centro(in centro_x varchar(80),
                              in disponible_x varchar(10),
                              in dias int(11),
                              in capacidad int(11))
                              
Begin
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
  
end;

commit;

select * FROM catalogo_centro;
call nuevo_centro('CAMIP 1', 'Si' , '10', '80');


select Centro FROM catalogo_centro where disponible = true;


select * from vacuna;
update vacuna set vacuna = 'Moderna';

drop procedure editar_disponibilidad;

create procedure editar_disponibilidad(in centro_x varchar(80),
                               in disponibilidad varchar(10))
Begin

  start transaction;
  
    if disponibilidad = 'Si' then
      update catalogo_centro set disponible = true where Centro = centro_x;
    elseif disponibilidad = 'No' then 
      update catalogo_centro set disponible = false where Centro = centro_x;
    end if;
  commit;
end;
commit;
select * from catalogo_centro;

call editar_disponibilidad('CAMIP 1', 'Si');


drop procedure editar_centro;

create procedure editar_centro(in centro_x varchar(80),
                               in campo varchar(10),
                               in valor int(11))
Begin

  start transaction;
  
    if campo = 'dias' then
      update catalogo_centro set dias_asignacion = valor where Centro = centro_x;
    elseif campo = 'capacidad' then 
      update catalogo_centro set capacidad_diaria = valor where Centro = centro_x;
    end if;
  commit;
end;
commit;
select * from catalogo_centro;

call editar_centro('CAMIP 1', 'capacidad', '90');








drop procedure crear_vacuna;

create procedure crear_vacuna(in vacuna_x varchar(60),
                               in disponible_x varchar(10),
                               in ndosis int(11),
                               in diasDosis2 int(11),
                               in diasDosis3 int(11))
Begin

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
end;
commit;
select * from catalogo_vacuna;

call crear_vacuna('Moderna', 'Si', '3', '21','120');






drop procedure disponibilidad_vacuna;

create procedure disponibilidad_vacuna(in vacuna_x varchar(60),
                               in disponibilidad varchar(10))
Begin

  start transaction;
  
    if disponibilidad = 'Si' then
      update catalogo_vacuna set disponibilidad = true where vacuna = vacuna_x;
    elseif disponibilidad = 'No' then 
      update catalogo_vacuna set disponibilidad = false where vacuna = vacuna_x;
    end if;
  commit;
end;


select * from catalogo_vacuna;

call disponibilidad_vacuna('Moderna', 'Si');







drop procedure editar_vacuna;

create procedure editar_vacuna(in vacuna_x varchar(60),
                               in campo varchar(10),
                               in valor int(11))
Begin

  start transaction;
  
    if campo = 'ndosis' then
      update catalogo_vacuna set ndosis = valor where vacuna = vacuna_x; 
    elseif campo = 'dosis2' then 
      update catalogo_vacuna set tiempo_dosis2 = valor where vacuna = vacuna_x;
    elseif campo = 'dosis3' then 
      update catalogo_vacuna set tiempo_dosis3 = valor where vacuna = vacuna_x;
    end if;
  commit;
end;
commit;
select * from catalogo_vacuna;

call editar_vacuna('Moderna', 'ndosis', '3');











select v.dpi, v.fecha_registro, c.centro FROM cola_vacuna v join centro_vacunacion c on v.dpi = c.dpi order by c.centro asc, v.fecha_registro asc;

select dpi, fecha_registro, centro FROM cola_centro;


drop procedure asignar_fecha;

create procedure asignar_fecha()
begin
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

end;

call asignar_fecha();

select * from cola_centro;
select * from cola_vacuna;

select dias_asignacion, capacidad_diaria FROM catalogo_centro;

commit;

select * from vacuna;





drop procedure registro_enfermedad;

create procedure registro_enfermedad( in enfermedad_x varchar(80),
                                      in valor varchar(10))
Begin
  start transaction;
    if valor = 'Si' then 
      update catalogo_enfermedad set registro = true where enfermedad_cronica = enfermedad_x;
    elseif valor = 'No' then 
      update catalogo_enfermedad set registro = false where enfermedad_cronica = enfermedad_x;
    end if;
  commit;
end;

select * from catalogo_enfermedad;

call registro_enfermedad('Alzheimer','Si');



drop procedure registro_grupo;

create procedure registro_grupo( in grupo_x varchar(80),
                                      in valor varchar(10))
Begin
  start transaction;
    if valor = 'Si' then 
      update catalogo_grupo set registro = true where grupo = grupo_x;
    elseif valor = 'No' then 
      update catalogo_grupo set registro = false where grupo = grupo_x;
    end if;
  commit;
end;

select * from catalogo_grupo;

call registro_enfermedad('Alzheimer','Si');




drop procedure registro_fecha;

create procedure registro_fecha( in fecha_x varchar(80))
Begin
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    rollback;
  END;

  start transaction;
    update edad_registro set fecha = STR_TO_DATE( fecha_x ,'%d/%m/%Y');
  commit;
end;

select * from edad_registro;

call registro_fecha('21/08/2000');

rollback;


select * from enfermedad;
select * from vacuna;
select count(*) , e.enfermedad_cronica from historial h inner join enfermedad e on h.dpi = e.dpi  where h.dosis1 = true and e.enfermedad_cronica = 'Alzheimer'  group by e.enfermedad_cronica;



drop function porcentaje_enfermedad; 

CREATE FUNCTION porcentaje_enfermedad( enfermedad_x varchar(80), dosis_x varchar(30)) RETURNS varchar(100)
BEGIN
declare total int(11);
declare division float;
declare texto varchar(100);

  select count(*) into total from usuario;
  if dosis_x = 'dosis1' then 
    select ((count(*)/total)*100) into division from historial h inner join enfermedad e on h.dpi = e.dpi  
    where h.dosis1 = true and e.enfermedad_cronica = enfermedad_x  group by e.enfermedad_cronica;
    set texto = ifnull(concat( enfermedad_x, ': ',division,'%'),concat( enfermedad_x, ': 0.00%'));
  elseif dosis_x = 'dosis2' then 
    select ((count(*)/total)*100) into division from historial h inner join enfermedad e on h.dpi = e.dpi  
    where h.dosis2 = true and e.enfermedad_cronica = enfermedad_x  group by e.enfermedad_cronica;
    set texto = ifnull(concat( enfermedad_x, ': ',division,'%'),concat( enfermedad_x, ': 0.00%'));
  elseif dosis_x = 'dosis3' then 
    select ((count(*)/total)*100) into division from historial h inner join enfermedad e on h.dpi = e.dpi  
    where h.dosis3 = true and e.enfermedad_cronica = enfermedad_x  group by e.enfermedad_cronica;
    set texto = ifnull(concat( enfermedad_x, ': ',division,'%'),concat( enfermedad_x, ': 0.00%'));
  end if;
	
	RETURN texto;
END;


select enfermedad_cronica , porcentaje_enfermedad(enfermedad_cronica,'dosis1') as porcentaje from  catalogo_enfermedad order by enfermedad_cronica;

commit;

SELECT IFNULL(1/0, "W3Schools.com");

select DATE_FORMAT(fecha, "%e/%m/%Y") as fecha from edad_registro;

insert into contenido (
   elemento
  ,url_imagen
  ,titulo
  ,contenido
) VALUES (
   ''  -- elemento - IN varchar(255)
  ,''  -- url_imagen - IN varchar(255)
  ,''  -- titulo - IN varchar(255)
  ,''  -- contenido - IN text
);

select * from contenido;

rollback;

drop procedure insertar_imagen;

create procedure insertar_imagen(in url_x varchar(255))
begin
  start transaction;
    insert into imagenes (
       nombre_imagen
    ) VALUES (
       url_x
    );
  commit;
end;

rollback;
commit;

drop procedure cambiar_imagen;

create procedure cambiar_imagen(in elemento_x varchar(255),
                    in imagen_x varchar(255))
begin
  start transaction;
    update contenido set nombre_imagen = imagen_x where elemento = elemento_x;
  commit;
end;



drop procedure cambiar_imagen;

create procedure cambiar_link(in elemento_x varchar(255),
                    in link_x varchar(255))
begin
  start transaction;
    update contenido set url = link_x where elemento = elemento_x;
  commit;
end;


drop procedure cambiar_texto;

create procedure cambiar_texto(in elemento_x varchar(255),
                               in titulo_x varchar(255),
                               in texto_x text)
begin
  start transaction;
    update contenido set titulo = titulo_x where elemento = elemento_x ;
    update contenido set contenido = texto_x  where elemento = elemento_x;
  commit;
end;

select * from contenido;

commit;

select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
  inner join vacuna v on u.dpi = v.dpi 
  inner join centro_vacunacion c on u.dpi = c.dpi  
  where ( v.dosis1_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day) 
          or v.dosis2_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day) 
          or v.refuerzo_fecha between date(now()) and DATE_ADD(now() , INTERVAL 7 day) );
          
          
          select * from confirmacion where vacuna != '';
rollback;


drop view proceso;


CREATE VIEW proceso AS

select u.dpi, 
DATE_FORMAT(u.inscripcion, "%e/%m/%Y") as inscripcion,
bool_vacuna(v.vacuna) as vacuna, 
DATE_FORMAT(v.dosis1_fecha, "%e/%m/%Y") as dosis1_fecha, 
bool_dosis(h.dosis1, v.dosis1_fecha) as dosis1,
DATE_FORMAT(v.dosis2_fecha, "%e/%m/%Y") as dosis2_fecha, 
bool_dosis(h.dosis2, v.dosis2_fecha) as dosis2,
DATE_FORMAT(v.refuerzo_fecha, "%e/%m/%Y") as refuerzo_fecha, 
bool_dosis(h.dosis3, v.refuerzo_fecha) as dosis3,
IFNULL(completado(u.dpi,v.vacuna),'Vacunación en proceso') as proceso
from usuario u 
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi;



select * from proceso;

drop function bool_dosis;

CREATE FUNCTION bool_dosis (dosis tinyint,fecha date) RETURNS varchar(40)
BEGIN
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
END;


drop function completado;


CREATE FUNCTION completado(dpi_x bigint(13),vacuna_x varchar(40)) RETURNS varchar(40)
BEGIN
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
END;

CREATE FUNCTION bool_vacuna(vacuna_x varchar(40)) RETURNS varchar(40)
BEGIN
declare valor varchar(40);
  
if vacuna_x != '' then
  set valor = vacuna_x;
else 
  set valor = 'No asignada';
end if;

	RETURN valor;
END;



select *from catalogo_vacuna;
rollback;
commit;
          
          
drop procedure prueba_out;



create procedure prueba_out(out variable bigint(20))
begin 
  set variable = 123;
end;


select (max(codigo)+ 1) from registro_estado;

rollback;


select * from proceso;
select * FROM registro_estado;

drop procedure generar_pdf;

create procedure generar_pdf(in codigo_x varchar(60),
                             in inscripcion_x varchar(60),
                             in vacuna_x varchar(60),
                             in dosis1_fecha_x varchar(60),
                             in dosis1_x varchar(60),
                             in dosis2_fecha_x varchar(60),
                             in dosis2_x varchar(60),
                             in dosis3_fecha_x varchar(60),
                             in dosis3_x varchar(60),
                             in proceso_x varchar(60)
                             )
begin
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
end;


call generar_pdf('10000000000000000003', '25/12/2000', 'Moderna', '25/5/2020', 'Efectuada','25/5/2020', 'Efectuada', '0/00/0000', 'Efectuada', 'Vacunacion completa');


select ifnull(STR_TO_DATE('0/00/0000','%d/%m/%Y'),'');



select codigo,
DATE_FORMAT(inscripcion, "%e/%m/%Y") as inscripcion,
vacuna,
DATE_FORMAT(dosis1_fecha, "%e/%m/%Y") as dosis1_fecha,
dosis1,
DATE_FORMAT(dosis2_fecha, "%e/%m/%Y") as dosis2_fecha,
dosis2,
DATE_FORMAT(refuerzo_fecha, "%e/%m/%Y") as refuerzo_fecha,
dosis3,
proceso
FROM registro_estado;



select u.dpi, u.nombre, u.apellido, c.centro, v.vacuna, v.dosis1_fecha, v.dosis2_fecha, v.refuerzo_fecha from usuario u 
inner join centro_vacunacion c on u.dpi = c.dpi
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi 
where (dosis1 = true and v.dosis1_fecha between '1981-01-01' and '2022-01-01') 
or (dosis2 = true and v.dosis2_fecha between '1981-01-01' and '2022-01-01') 
or (dosis3 = true and v.refuerzo_fecha between '1981-01-01' and '2022-01-01') 
order by c.centro, v.dosis1_fecha, v.dosis2_fecha, v.refuerzo_fecha;



/*SELECT cast(FLOOR(RAND()*(8000000000000000000)+10000000000000000000) as varchar(20));*/


CREATE VIEW detalle_centro AS

select u.dpi, u.nombre, u.apellido, c.centro, v.vacuna, v.dosis1_fecha as fecha from usuario u 
inner join centro_vacunacion c on u.dpi = c.dpi
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi
where h.dosis1 = true
union select u.dpi, u.nombre, u.apellido, c.centro, v.vacuna,  v.dosis2_fecha from usuario u 
inner join centro_vacunacion c on u.dpi = c.dpi
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi
where h.dosis2 = true
union select u.dpi, u.nombre, u.apellido, c.centro, v.vacuna,  v.refuerzo_fecha from usuario u 
inner join centro_vacunacion c on u.dpi = c.dpi
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi 
where h.dosis3 = true;


select * from detalle_centro where centro = 'CAMIP 1' order by centro asc, fecha asc ;

drop view ausencia_vacuna;

CREATE VIEW ausencia_vacuna AS

select u.dpi, u.nombre, u.apellido, c.centro, v.vacuna, v.dosis1_fecha, v.dosis2_fecha, v.refuerzo_fecha, h.dosis1, h.dosis2, h.dosis3 
from usuario u 
inner join centro_vacunacion c on u.dpi = c.dpi
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi
where vacuna != '';

select * from ausencia_vacuna
where (dosis1_fecha < date_add(now(), interval -7 day) and dosis1 = false and dosis1_fecha != '')
or (dosis2_fecha < date_add(now(), interval -7 day) and dosis2 = false and dosis2_fecha != '')
or (refuerzo_fecha < date_add(now(), interval -7 day) and dosis3 = false and refuerzo_fecha != '');
 
 
select * from ausencia_vacuna;
select * from ausencia_vacuna where dosis1_fecha < date_add(now(), interval -7 day) and dosis1_fecha != '';



select * from contacto_enfermedad;

CREATE VIEW contacto_enfermos AS

select u.dpi,
u.nombre,
u.apellido,
DATE_FORMAT(u.fecha_nacimiento, "%e/%m/%Y") as fecha_nacimiento,
en.enfermedad_cronica,
ce.centro,
co.telefono,
co.email,
DATE_FORMAT(v.dosis1_fecha, "%e/%m/%Y") as dosis1_fecha,
DATE_FORMAT(v.dosis2_fecha, "%e/%m/%Y") as dosis2_fecha,
DATE_FORMAT(v.refuerzo_fecha, "%e/%m/%Y") as refuerzo_fecha,
bool_dosis(h.dosis1, v.dosis1_fecha) as dosis1,
bool_dosis(h.dosis2, v.dosis2_fecha) as dosis2,
bool_dosis(h.dosis3, v.refuerzo_fecha) as dosis3 
from usuario u 
inner join enfermedad en on u.dpi = en.dpi
inner join centro_vacunacion ce on u.dpi = ce.dpi
inner join contacto co on u.dpi = co.dpi
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi
order by ce.centro asc, en.enfermedad_cronica asc, u.dpi asc;

select * from contacto_enfermos;



CREATE VIEW historial_grupo AS

select u.dpi,
u.nombre,
u.apellido,
DATE_FORMAT(u.fecha_nacimiento, "%e/%m/%Y") as fecha_nacimiento,
g.grupo,
DATE_FORMAT(v.dosis1_fecha, "%e/%m/%Y") as dosis1_fecha,
DATE_FORMAT(v.dosis2_fecha, "%e/%m/%Y") as dosis2_fecha,
DATE_FORMAT(v.refuerzo_fecha, "%e/%m/%Y") as refuerzo_fecha,
bool_dosis(h.dosis1, v.dosis1_fecha) as dosis1,
bool_dosis(h.dosis2, v.dosis2_fecha) as dosis2,
bool_dosis(h.dosis3, v.refuerzo_fecha) as dosis3 
from usuario u 
inner join grupo_prioritario g on u.dpi = g.dpi
inner join vacuna v on u.dpi = v.dpi
inner join historial h on u.dpi = h.dpi
order by g.grupo asc, u.dpi asc ;



select * from historial_grupo;

select u.nombre, u.apellido, c.email, cen.centro, DATE_FORMAT(date_add(now(),interval 7 day), "%e/%m/%Y") as fecha_programada from usuario u
inner join vacuna v on u.dpi = v.dpi
inner join contacto c on u.dpi = c.dpi 
inner join centro_vacunacion cen on u.dpi = cen.dpi
where (dosis1_fecha = date(date_add(now(),interval 8 day))) 
or (dosis2_fecha = date(date_add(now(),interval 8 day)))
or (refuerzo_fecha = date(date_add(now(),interval 8 day)));