import { IReportePolizaRepository } from "@/domain/repositories/reporte-poliza.repository.interface";
import { ReportePolizaRespDto } from "../dto/response/reporte-poliza-resp.dto";
import { ReqFilterDto } from "../dto/request/req-filter.dto";
import { PolizaReporte } from "@/domain/entities/poliza-reporte.entity";


export class ReportePolizaService {
  constructor(private readonly reportePolizaRepository: IReportePolizaRepository) { }

  async getActiveProspectosCount(reqFilter: ReqFilterDto, username: string): Promise<ReportePolizaRespDto> {
    let role: string | null = null;

    if (username) {
      try {
        role = await this.reportePolizaRepository.findRolByNickname(username);
        console.log('🔍 [reporte] nickname:', username, '| role obtenido:', role);
      } catch (error) {
        console.error('Error al consultar rol del reporte:', error);
      }
    }
    const polizaReporte: PolizaReporte = await this.reportePolizaRepository.reportePolizaUsuario(
      reqFilter.desde,
      reqFilter.hasta,
      username,
      role);

    return new ReportePolizaRespDto(
      polizaReporte.vigente,
      polizaReporte.vencido,
      polizaReporte.anulado,
      polizaReporte.total,
      polizaReporte.porVencer,
      polizaReporte.nueva,
      polizaReporte.renovacion,
    );
  }
}