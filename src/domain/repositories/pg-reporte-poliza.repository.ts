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
    nickname: string | null = null,
    role: string | null = null
  ): Promise<PolizaReporte> {
    const params = [desde, hasta, nickname, role];

    const polizaReport = await this.pool.query(
      Queries.poliza.polizaReport(),
      params
    );

    const polizaNuevaReport = await this.pool.query(
      Queries.poliza.polizaNuevaReport(),
      params
    );

    const polizaPorVencerReport = await this.pool.query(
      Queries.poliza.polizaPorVencerReport(),
      params
    );

    const polizaRenovadoReport = await this.pool.query(
      Queries.poliza.polizaRenovadoReport(),
      params
    );

    const polizaTotalReport = await this.pool.query(
      Queries.poliza.polizaTotalReport(),
      params
    );

    return this.toDomain(polizaReport, polizaNuevaReport, polizaPorVencerReport, polizaRenovadoReport, polizaTotalReport);
  }

  private toDomain(result: QueryResult<any>, resultNueva: QueryResult<any>, resultPorVencer: QueryResult<any>, resultRenovado: QueryResult<any>, resultTotal: QueryResult<any>): PolizaReporte {
    const row = result.rows[0] ?? {};
    const rowNueva = resultNueva.rows[0] ?? {};
    const rowPorVencer = resultPorVencer.rows[0] ?? {};
    const rowRenovado = resultRenovado.rows[0] ?? {};
    const rowTotal = resultTotal.rows[0] ?? {};

    const vigente = Number(row.VIGENTE ?? 0);
    const vencido = Number(row.VENCIDO ?? 0);
    const anulado = Number(row.ANULADO ?? 0);
    const nuevas = Number(rowNueva.NUEVAS ?? 0);
    const porVencer = Number(rowPorVencer.POR_VENCER ?? 0);
    const renovadas = Number(rowRenovado.RENOVADAS ?? 0);

    const total = Number(rowTotal.TOTAL ?? 0);

    return new PolizaReporte(
      vigente,
      vencido,
      anulado,
      total,
      porVencer,
      nuevas,
      renovadas
    );
  }

  async findRolByNickname(nickname: string): Promise<string | null> {
    const result = await this.pool.query(Queries.poliza.findRolByNickname(),
      [nickname]); return result.rows[0]?.rol_nombre || null;
  }

}