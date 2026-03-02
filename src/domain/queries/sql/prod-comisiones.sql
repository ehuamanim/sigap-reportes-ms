WITH meses AS (
    SELECT 
        generate_series(1, 12) AS mes
)
SELECT 
    $1 AS anio,
    CASE m.mes
        WHEN 1 THEN 'Enero'
        WHEN 2 THEN 'Febrero'
        WHEN 3 THEN 'Marzo'
        WHEN 4 THEN 'Abril'
        WHEN 5 THEN 'Mayo'
        WHEN 6 THEN 'Junio'
        WHEN 7 THEN 'Julio'
        WHEN 8 THEN 'Agosto'
        WHEN 9 THEN 'Setiembre'
        WHEN 10 THEN 'Octubre'
        WHEN 11 THEN 'Noviembre'
        WHEN 12 THEN 'Diciembre'
    END AS mes_nombre,
    m.mes AS mes_numero,
    SUM(COALESCE(p.monto_comision, p.monto_comision_aseg) * p.tipo_cambio_valor_soles) AS total_comision
FROM meses m
LEFT JOIN poliza.poliza p 
    ON EXTRACT(MONTH FROM p.fecha_ini_vigencia) = m.mes
    AND EXTRACT(YEAR FROM p.fecha_ini_vigencia) = $1
    AND p.estado = 'A'
GROUP BY m.mes
ORDER BY m.mes;