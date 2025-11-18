select
    count(p.*) cantidad
from poliza.poliza p
LEFT JOIN poliza.cliente cli ON cli.id = p.cont_id
LEFT JOIN maestros.tipo_documento td ON cli.tipo_documento_id = td.id
LEFT JOIN maestros.ramo r ON r.id = p.ramo_id
where p.estado = 'A'
    and p.situacion_poliza = 'VENCIDO'
    and p.fecha_fin_vigencia < current_date
    and upper(p.usuario_registro) = upper( $1 )
    and ($2 is null or $3 is null or p.fecha_ini_vigencia between to_date($2, 'DD/MM/YYYY') and to_date($3, 'DD/MM/YYYY'))
    AND UPPER(
      CONCAT_WS(        
        p.numero_poliza,
        cli.nro_documento,
        cli.apellido_paterno,
        cli.apellido_materno,
        cli.nombres,
        cli.razon_social,
        r.nombre
      )
    ) LIKE UPPER($4)
order by cantidad desc