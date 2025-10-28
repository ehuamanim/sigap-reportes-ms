select
    count(*) cantidad
from poliza.poliza p
where p.estado = 'A'
    and p.fecha_fin_vigencia between date_trunc('month', current_date) and current_date
    and p.situacion_poliza = 'VIGENTE'
    and upper(p.usuario_registro) = upper('ehuamani')
order by cantidad desc