select
  coalesce(sum(case when p.estado_poliza = 'VI' then 1 else 0 end), 0) as "VIGENTE",
  coalesce(sum(case when p.estado_poliza = 'VE' then 1 else 0 end), 0) as "VENCIDO",
  coalesce(sum(case when p.estado_poliza = 'AN' then 1 else 0 end), 0) as "ANULADO"
from poliza.poliza p
where p.estado in ('A','F') 
and p.tipo_poliza = 'PO'
and
  (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    p.fecha_ini_vigencia between to_date($1,'DD/MM/YYYY') and to_date($2,'DD/MM/YYYY')
  )
   AND (
  $4::text IS NULL
  OR UPPER(TRIM($4::text)) <> UPPER('Referenciador')
  OR UPPER(TRIM(p.usuario_registro)) = UPPER(TRIM($3::text))
)
