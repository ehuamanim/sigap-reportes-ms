import { ReportePolizaRespDto } from "@/application/dto/response/reporte-poliza-resp.dto";


export interface IReportePolizaRepository {
  reportePolizaUsuario( nickname: string ): Promise<ReportePolizaRespDto>;
}