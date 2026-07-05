import { loadSql } from "@/shared/database/sql-loader";


export const Queries = {
    poliza: {
        polizaReport: () => loadSql('domain/queries/sql/poliza-report.sql'),
        polizaNuevaReport: () => loadSql('domain/queries/sql/poliza-nueva-report.sql'),
        polizaPorVencerReport: () => loadSql('domain/queries/sql/poliza-por-vencer-report.sql'),
        polizaRenovadoReport: () => loadSql('domain/queries/sql/poliza-renovado-report.sql'),
        polizaTotalReport: () => loadSql('domain/queries/sql/poliza-total-report.sql'),
        findRolByNickname: () => loadSql('domain/queries/sql/poliza-find-rol-by.sql'),

    },
    produccion: {
        comisiones: () => loadSql('domain/queries/sql/prod-comisiones.sql'),
        primas: () => loadSql('domain/queries/sql/prod-prima.sql')
    }
} as const;