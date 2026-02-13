select
  count(*) as "POR_VENCER"
from poliza.poliza p
where p.estado_poliza = 'PV'
  and (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    p.fecha_ini_vigencia between to_date($1,'DD/MM/YYYY') and to_date($2,'DD/MM/YYYY')
  );
