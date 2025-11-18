// src/domain/repositories/pg-reporte-poliza.repository.ts
import { Pool, QueryResult } from 'pg';
import { IReportePolizaRepository } from './reporte-poliza.repository.interface';
import { Queries } from '../queries/query-registry';
import { PolizaReporte } from '../entities/poliza-reporte.entity';

export class PgReportePolizaRepository implements IReportePolizaRepository {
  constructor(private readonly pool: Pool) { }

  async reportePolizaUsuario(
    desde: string | null = null,
    hasta: string | null = null,
    nickname: string): Promise<PolizaReporte> {
    const polizaReport = await this.pool.query(Queries.poliza.polizaReport(), [desde, hasta, nickname]);

    return this.toDomain(polizaReport);
  }

  private toDomain(result: QueryResult<any>): PolizaReporte {
    const row = result.rows[0];
    if (!row) {
      throw new Error('No data found');
    }

    console.log('Reporte Poliza Row:', row);

    return new PolizaReporte(
      Number(row.VIGENTE ?? 0),
      Number(row.VENCIDO ?? 0),
      Number(row.ANULADO ?? 0),
      (Number(row.VIGENTE ?? 0)) + (Number(row.VENCIDO ?? 0))
    );
  }

}