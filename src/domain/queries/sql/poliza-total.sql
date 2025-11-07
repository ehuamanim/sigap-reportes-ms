select
    count(*) cantidad
from poliza.poliza p
where p.estado = 'A'
    and p.situacion_poliza = 'VIGENTE'
    and upper(p.usuario_registro) = upper( $1 )
order by cantidad desc