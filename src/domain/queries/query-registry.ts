import { loadSql } from "@/shared/database/sql-loader";


export const Queries = {
    poliza: {
        polizaReport: () => loadSql('domain/queries/sql/poliza-report.sql'),
    }
} as const;