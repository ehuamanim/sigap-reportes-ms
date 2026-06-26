SELECT count(*) as "POR_VENCER"
FROM poliza.poliza p
WHERE p.estado IN ('A','F')
  AND p.tipo_poliza = 'PO'
  AND p.fecha_fin_vigencia IS NOT NULL    
  AND p.estado_poliza NOT IN ('PL', 'RE','NU','AN', 'VE') 
  AND COALESCE(p.renovacion_usuario, '') <> 'N'
  AND p.fecha_fin_vigencia::date >= (CURRENT_DATE - INTERVAL '1 month')::date
  AND p.fecha_fin_vigencia::date <= (CURRENT_DATE + INTERVAL '60 day')::date
  AND (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    (    
       p.fecha_ini_vigencia >= to_date($1,'DD/MM/YYYY')::timestamp AT TIME ZONE 'America/Lima'
          and p.fecha_ini_vigencia < (to_date($2,'DD/MM/YYYY') + interval '1 day')::timestamp AT TIME ZONE 'America/Lima'  
    )
  )
  AND (
    $4::text IS NULL
    OR UPPER(TRIM($4::text)) <> UPPER('Referenciador')
    OR UPPER(TRIM(p.usuario_registro)) = UPPER(TRIM($3::text))
  );