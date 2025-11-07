import { IReportePolizaRepository } from "@/domain/repositories/reporte-poliza.repository.interface";
import { ReportePolizaRespDto } from "../dto/response/reporte-poliza-resp.dto";


export class ReportePolizaService {
  constructor(private readonly reportePolizaRepository: IReportePolizaRepository) {}

  async getActiveProspectosCount( username: string ): Promise<ReportePolizaRespDto> {
    return this.reportePolizaRepository.reportePolizaUsuario(username);
  }
}