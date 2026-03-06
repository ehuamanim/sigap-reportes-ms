SELECT 
r.nombre as rol_nombre 
FROM seguridad.usuario u 
INNER JOIN seguridad.rol r ON r.id = u.rol_id 
WHERE u.nickname = $1 
AND u.estado = 'A'