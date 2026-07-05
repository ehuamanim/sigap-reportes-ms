// src/domain/repositories/pg-reporte-poliza.repository.ts
import { Pool, QueryResult } from "pg";
import { Queries } from "../queries/query-registry";
import { IProduccionRepository } from "./produccion.repository.interface";
import { ProduccionRespDto } from "@/application/dto/response/produccion-resp.dto";

export class PgProduccionRepository implements IProduccionRepository {
  constructor(private readonly pool: Pool) { }

  async getProduccionByAnio(anios: string[]): Promise<ProduccionRespDto> {
    const mesesToReport: ProduccionRespDto = {
      Enero: {},
      Febrero: {},
      Marzo: {},
      Abril: {},
      Mayo: {},
      Junio: {},
      Julio: {},
      Agosto: {},
      Setiembre: {},
      Octubre: {},
      Noviembre: {},
      Diciembre: {},
    };

    for (const anio of anios) {
      const prodAnio = await this.pool.query(Queries.produccion.comisiones(), [
        anio.trim(),
      ]);
      this.toDto(prodAnio, mesesToReport, anio);
    }

    return mesesToReport;
  }

  private toDto(
    result: QueryResult<any>,
    mesesToReport: ProduccionRespDto,
    anioToReport: string,
  ): ProduccionRespDto {
    result.rows.map((row) => {
      console.log(row);
      let mes = mesesToReport[row["mes_nombre"]];         // Obtienes el mes
      mes[anioToReport] = Number(row["total_comision"]);  // Asignas el valor que se retorna en el año consultado
    });
    return mesesToReport;
  }

  async getProduccionByAnioPrima(anios: string[]): Promise<ProduccionRespDto> {
    const mesesToReport: ProduccionRespDto = {
      Enero: {},
      Febrero: {},
      Marzo: {},
      Abril: {},
      Mayo: {},
      Junio: {},
      Julio: {},
      Agosto: {},
      Setiembre: {},
      Octubre: {},
      Noviembre: {},
      Diciembre: {},
    };

    for (const anio of anios) {
      const prodAnio = await this.pool.query(Queries.produccion.primas(), [
        anio.trim(),
      ]);
      this.toDtoPrima(prodAnio, mesesToReport, anio);
    }

    return mesesToReport;
  }

  private toDtoPrima(
    result: QueryResult<any>,
    mesesToReport: ProduccionRespDto,
    anioToReport: string,
  ): ProduccionRespDto {
    result.rows.map((row) => {
      console.log(row);
      let mes = mesesToReport[row["mes_nombre"]];   
      mes[anioToReport] = Number(row["total_prima"]);
    });
    return mesesToReport;
  }
}
