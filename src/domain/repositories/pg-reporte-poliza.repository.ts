// src/domain/repositories/pg-reporte-poliza.repository.ts
import { Pool, QueryResult } from 'pg';
import { IReportePolizaRepository } from './reporte-poliza.repository.interface';
import { Queries } from '../queries/query-registry';
import { PolizaReporte } from '../entities/poliza-reporte.entity';

export class PgReportePolizaRepository implements IReportePolizaRepository {
  constructor(private readonly pool: Pool) { }

  async reportePolizaUsuario(
    desde: string | null = null,
    hasta: string | null = null
  ): Promise<PolizaReporte> {
    const polizaReport = await this.pool.query(Queries.poliza.polizaReport(), [desde, hasta]);
    const polizaNuevaReport = await this.pool.query(Queries.poliza.polizaNuevaReport(), []);
    const polizaPorVencerReport = await this.pool.query(Queries.poliza.polizaPorVencerReport(), []);

    return this.toDomain(polizaReport, polizaNuevaReport, polizaPorVencerReport);
  }

  private toDomain(result: QueryResult<any>, resultNueva: QueryResult<any>, resultPorVencer: QueryResult<any>): PolizaReporte {
    const row = result.rows[0];
    const rowNueva = resultNueva.rows[0];
    const rowPorVencer = resultPorVencer.rows[0];

    let polizaReporte: PolizaReporte = new PolizaReporte(
      Number(row.VIGENTE ?? 0),
      Number(row.VENCIDO ?? 0),
      Number(row.ANULADO ?? 0),
      (Number(row.VIGENTE ?? 0)) + (Number(row.VENCIDO ?? 0)),
      Number(rowPorVencer.POR_VENCER ?? 0),
      Number(rowNueva.NUEVAS ?? 0)
    );

    return polizaReporte;
  }

}