select count(*) as "NUEVAS"
from poliza.poliza p
where p.estado = 'A'
  and p.situacion_poliza <> 'ANULADO'
  and date_trunc('month', p.fecha_ini_vigencia) = date_trunc('month', CURRENT_DATE)
  and p.fecha_fin_vigencia >= CURRENT_DATE
  and NOT (
    p.fecha_fin_vigencia >= CURRENT_DATE
    and p.fecha_fin_vigencia < CURRENT_DATE + INTERVAL '60 days'
  )
  and (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    p.fecha_ini_vigencia between to_date($1,'DD/MM/YYYY') and to_date($2,'DD/MM/YYYY')
  );
