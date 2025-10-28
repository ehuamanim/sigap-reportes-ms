import { loadSql } from "@/shared/database/sql-loader";

export const Queries = {
    poliza: {
        statPorVencer: () => loadSql('domain/queries/sql/poliza-por-vencer.sql'),
        statSituacionMensual: () => loadSql('domain/queries/sql/poliza-situacion-mensual.sql'),
        statTotal: () => loadSql('domain/queries/sql/poliza-total.sql'),
        statVencido: () => loadSql('domain/queries/sql/poliza-vencida.sql')
    }
} as const;