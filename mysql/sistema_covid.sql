use sistema_covid;
select * from usuario;





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
    start transaction;



    insert into usuario (dpi ,clave, nombre, apellido, fecha_nacimiento, tipo_usuario) 
    
    values (
      dpi_x,
      clave_x,
      nombre_x,
      apellido_x,
      fecha_nacimiento_x,
      tipo_usuario_x
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
      DATE_ADD(now() , INTERVAL 10 day),
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
    
    select count(id_enfermedad) from enfermedad into new_enfermedad;
    set new_enfermedad = new_enfermedad + 1;
    insert into enfermedad (id_enfermedad, dpi, enfermedad_cronica ) 
    values (
      new_enfermedad,
      dpi_x,
      enfermedad_x
    );
    end if;
    
    if grupo_x != '' then
    
    select count(id_grupo) from grupo_prioritario into new_grupo;
    set new_grupo = new_grupo + 1;
    insert into grupo_prioritario (id_grupo, dpi, grupo ) 
    values (
      new_grupo,
      dpi_x,
      grupo_x
    );
    end if;
    commit;
  
end;


rollback;
select * from vacuna;
select * from usuario;
select * from contacto;
select * FROM enfermedad;
select * from grupo_prioritario;

select  date(now());

call registro('125558','clave123','agusto','perez','2000-1-31','1','123456','prueba@gmail.com','UNIS','abc','maestro');

update usuario set fecha_nacimiento = '2000-8-21';
update vacuna set dosis1_fecha = now() where dpi = 1234567 ;
commit;

select u.dpi, u.nombre, u.apellido, u.fecha_nacimiento , v.* , c.* from usuario u 
inner join vacuna v on u.dpi = v.dpi 
inner join centro_vacunacion c on u.dpi = c.dpi  
where ( v.dosis1_fecha = date(now()) or v.dosis2_fecha = date(now()) or
v.refuerzo_fecha =  date(now())) and u.dpi = '125558' and c.centro = 'unis';



drop procedure asignacion_dosis;

create procedure asignacion_dosis(in dpi_x bigint(13),
                          in dosis varchar(60)
                          )
begin
  start transaction;
    if dosis = 'Pfizer' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 21 day) where dpi = dpi_x;
      /*update vacuna set refuerzo_fecha = DATE_ADD(DATE_ADD(now() , INTERVAL 21 day) , INTERVAL 8 MONTH) where dpi = dpi_x;*/
    end if;
    
    if dosis = 'Moderna' then
      update vacuna set vacuna = dosis where dpi = dpi_x;
      update vacuna set dosis2_fecha = DATE_ADD(now() , INTERVAL 28 day) where dpi = dpi_x;
      /*update vacuna set refuerzo_fecha = DATE_ADD(DATE_ADD(now() , INTERVAL 28 day) , INTERVAL 8 MONTH) where dpi = dpi_x;*/
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

create procedure confirmar_dosis(dpi_x bigint(13),dosis_num varchar(60), vacuna_x varchar(60))
begin
   start transaction;
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
   commit;
end;


call confirmar_dosis( 123456, 'dosis1_fecha','Moderna');



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
