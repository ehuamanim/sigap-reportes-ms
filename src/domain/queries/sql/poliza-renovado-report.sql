select
  count(*) as "RENOVADAS"
from poliza.poliza p
where p.estado in ('A','F')
  and p.estado_poliza = 'RE'
  and p.tipo_poliza = 'PO'
  and (
    $1::text is null or $1::text = '' or
    $2::text is null or $2::text = '' or
    p.fecha_ini_vigencia between to_date($1,'DD/MM/YYYY') and to_date($2,'DD/MM/YYYY')
  );
