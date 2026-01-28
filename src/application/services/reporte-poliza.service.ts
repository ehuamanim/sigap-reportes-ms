import { IReportePolizaRepository } from "@/domain/repositories/reporte-poliza.repository.interface";
import { ReportePolizaRespDto } from "../dto/response/reporte-poliza-resp.dto";
import { ReqFilterDto } from "../dto/request/req-filter.dto";
import { PolizaReporte } from "@/domain/entities/poliza-reporte.entity";


export class ReportePolizaService {
  constructor(private readonly reportePolizaRepository: IReportePolizaRepository) { }

  async getActiveProspectosCount(reqFilter: ReqFilterDto, username: string): Promise<ReportePolizaRespDto> {
    const polizaReporte: PolizaReporte = await this.reportePolizaRepository.reportePolizaUsuario(
      reqFilter.desde,
      reqFilter.hasta);

    return new ReportePolizaRespDto(
      polizaReporte.vigente,
      polizaReporte.vencido,
      polizaReporte.anulado,
      polizaReporte.total,
      polizaReporte.porVencer,
      polizaReporte.nueva
    );
  }
}