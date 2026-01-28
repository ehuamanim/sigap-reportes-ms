select
    coalesce(sum(case when situacion_poliza = 'VIGENTE' then cantidad else 0 end), 0) as "VIGENTE",
    coalesce(sum(case when situacion_poliza = 'VENCIDO' then cantidad else 0 end), 0) as "VENCIDO",
    coalesce(sum(case when situacion_poliza = 'ANULADO' then cantidad else 0 end), 0) as "ANULADO"
from (
    select
        count(*) as cantidad,
        p.situacion_poliza
    from poliza.poliza p
    where p.estado = 'A'       
      AND ($1::text is null or $2::text is null or p.fecha_ini_vigencia between to_date($1, 'DD/MM/YYYY') and to_date($2, 'DD/MM/YYYY'))
    group by p.situacion_poliza
) src