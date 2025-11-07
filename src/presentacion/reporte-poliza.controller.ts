import { RespDto } from "@/application/dto/request/resp.dto";
import { ReportePolizaRespDto } from "@/application/dto/response/reporte-poliza-resp.dto";
import { ReportePolizaService } from "@/application/services/reporte-poliza.service";
import { AuthContext } from "@/shared/commons/auth-context";

export class ReportePolizaController {
  constructor(private readonly reportePolizaService: ReportePolizaService) { }

  private authContext!: AuthContext;

  setRequestContext(authContext: AuthContext) {
    this.authContext = authContext;
  }

  async getReportePolizaStats(): Promise<RespDto<ReportePolizaRespDto>> {
    const data = await this.reportePolizaService.getActiveProspectosCount(this.authContext.nickname);
    return RespDto.success(data);
  }

}