select
    count(*) as "NUEVAS"
FROM poliza.poliza p
WHERE p.estado = 'A'
    AND p.situacion_poliza != 'ANULADO'
    AND p.usuario_registro = $1 
    AND EXTRACT(MONTH FROM p.fecha_ini_vigencia) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM p.fecha_ini_vigencia) = EXTRACT(YEAR FROM CURRENT_DATE)