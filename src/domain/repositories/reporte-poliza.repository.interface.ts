import { PolizaReporte } from "../entities/poliza-reporte.entity";


export interface IReportePolizaRepository {
  reportePolizaUsuario( 
    desde: string | null, 
    hasta: string | null, 
    nickname: string ): Promise<PolizaReporte>;
}