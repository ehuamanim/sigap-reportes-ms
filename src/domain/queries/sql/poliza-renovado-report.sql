select
  count(p.poliza_id_anterior) as "RENOVADAS"
from poliza.poliza p
where p.estado = 'A'  
  and p.tipo_poliza = 'PO'
  and p.poliza_id_anterior is not null
  and (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    p.fecha_ini_vigencia between to_date($1,'DD/MM/YYYY') and to_date($2,'DD/MM/YYYY')
  )
  AND (
    $4::text IS NULL
    OR UPPER(TRIM($4::text)) <> UPPER('Referenciador')
    OR UPPER(TRIM(p.usuario_registro)) = UPPER(TRIM($3::text))
  );