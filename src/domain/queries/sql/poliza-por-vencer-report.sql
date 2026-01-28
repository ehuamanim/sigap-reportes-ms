select
    count(*) as "POR_VENCER"
FROM poliza.poliza p
WHERE p.estado = 'A'
    AND p.situacion_poliza != 'ANULADO'    
    AND p.fecha_fin_vigencia <= CURRENT_DATE + INTERVAL '2 months'