import { ReportePolizaRespDto } from "@/application/dto/response/reporte-poliza-resp.dto";


export interface IReportePolizaRepository {
  reportePolizaUsuario( 
    filter: string, 
    desde: string | null, 
    hasta: string | null, 
    nickname: string ): Promise<ReportePolizaRespDto>;
}