import { IReportePolizaRepository } from "@/domain/repositories/reporte-poliza.repository.interface";
import { ReportePolizaRespDto } from "../dto/response/reporte-poliza-resp.dto";
import { ReqFilterDto } from "../dto/request/req-filter.dto";


export class ReportePolizaService {
  constructor(private readonly reportePolizaRepository: IReportePolizaRepository) {}

  async getActiveProspectosCount( reqFilter: ReqFilterDto, username: string ): Promise<ReportePolizaRespDto> {

    return this.reportePolizaRepository.reportePolizaUsuario(
      reqFilter.filter, 
      reqFilter.desde, 
      reqFilter.hasta, 
      username);
  }
}