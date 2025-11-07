select
    count(*) cantidad,
    p.situacion_poliza
from poliza.poliza p
where p.estado = 'A'
    and p.fecha_registro between date_trunc('month', current_date) and current_date
    and upper(p.usuario_registro) = upper( $1 )
group by p.situacion_poliza
order by cantidad desc