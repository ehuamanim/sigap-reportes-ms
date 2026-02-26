select
  coalesce(sum(case when p.estado_poliza = 'VI' then 1 else 0 end), 0) as "VIGENTE",
  coalesce(sum(case when p.estado_poliza = 'VE' then 1 else 0 end), 0) as "VENCIDO",
  coalesce(sum(case when p.estado_poliza = 'AN' then 1 else 0 end), 0) as "ANULADO"
from poliza.poliza p
where p.tipo_poliza = 'PO'
and
  (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    p.fecha_ini_vigencia between to_date($1,'DD/MM/YYYY') and to_date($2,'DD/MM/YYYY')
  );
