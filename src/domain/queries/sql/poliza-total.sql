select
    count(*) cantidad
from poliza.poliza p
where p.estado = 'A'
    and p.situacion_poliza = 'VIGENTE'
    and upper(p.usuario_registro) = upper( $1 )
    and ($2 is null or $3 is null or p.fecha_ini_vigencia between to_date($2, 'DD/MM/YYYY') and to_date($3, 'DD/MM/YYYY'))
order by cantidad desc