select count(*) as "POR_VENCER"
from poliza.poliza p
where p.estado = 'A'    
  and p.tipo_poliza = 'PO'
  and p.estado_poliza = 'PV'  
  --and p.fecha_fin_vigencia is not null
  --and p.fecha_fin_vigencia::date between current_date and (current_date + interval '60 day')::date
  and (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    (p.fecha_ini_vigencia >= to_date($1,'DD/MM/YYYY')
     and p.fecha_ini_vigencia <  to_date($2,'DD/MM/YYYY') + interval '1 day')
  )
  AND (
  $4::text IS NULL
  OR UPPER(TRIM($4::text)) <> UPPER('Referenciador')
  OR UPPER(TRIM(p.usuario_registro)) = UPPER(TRIM($3::text))
)