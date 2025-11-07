select
    count(*) cantidad
from poliza.poliza p
where p.estado = 'A'
    and p.fecha_fin_vigencia < current_date
    and upper(p.usuario_registro) = upper( $1 )
order by cantidad desc