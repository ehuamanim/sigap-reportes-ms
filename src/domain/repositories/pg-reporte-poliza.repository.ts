// src/infrastructure/repositories/postgres-user.repository.ts
import { Pool, QueryResult } from 'pg';
import { IReportePolizaRepository } from './reporte-poliza.repository.interface';
import { Queries } from '../queries/query-registry';
import { ReportePolizaRespDto } from '@/application/dto/response/reporte-poliza-resp.dto';

export class PgReportePolizaRepository implements IReportePolizaRepository {
  constructor(private readonly pool: Pool) {}

  async reportePolizaUsuario( nickname: string ): Promise<ReportePolizaRespDto> {
    const resVencidas = await this.pool.query(Queries.poliza.statVencido(), [ nickname ]);
    const resPorVencer = await this.pool.query(Queries.poliza.statPorVencer(), [ nickname ]);
    const resSituacionMensual = await this.pool.query(Queries.poliza.statSituacionMensual(), [ nickname ]);
    const resTotal = await this.pool.query(Queries.poliza.statTotal(), [ nickname ]);

    return new ReportePolizaRespDto(
      PgReportePolizaRepository.getPolTotal(resTotal),
      PgReportePolizaRepository.getPolSituacionMensual(resSituacionMensual).vigentes || 0,
      PgReportePolizaRepository.getPolPorVencer(resPorVencer),
      PgReportePolizaRepository.getPolVencidas(resVencidas),
      PgReportePolizaRepository.getPolSituacionMensual(resSituacionMensual).anulados || 0,
    );
  }


  private static getPolTotal(result: QueryResult<any>): number {
    return result.rows.length > 0 ? parseInt(result.rows[0].cantidad, 10) : 0;
  }

  private static getPolVencidas(result: QueryResult<any>): number {
    return result.rows.length > 0 ? parseInt(result.rows[0].cantidad, 10) : 0;
  }

  private static getPolPorVencer(result: QueryResult<any>): number {
    return result.rows.length > 0 ? parseInt(result.rows[0].cantidad, 10) : 0;
  }

  private static getPolSituacionMensual(result: QueryResult<any>): any {
    const situacionPoliza: any = {}; 
    result.rows.forEach(
      (row) =>{

        if( row.situacion_poliza === 'VIGENTE' ){
          situacionPoliza.vigentes = parseInt(row.cantidad, 10);
        }

        if( row.situacion_poliza === 'VENCIDO' ){
          situacionPoliza.vencidos = parseInt(row.cantidad, 10);
        }

        if( row.situacion_poliza === 'ANULADO' ){
          situacionPoliza.anulados = parseInt(row.cantidad, 10);
        }

      });

    return situacionPoliza;
  }

}