import { RespDto } from "@/application/dto/response/resp.dto";
import { ReportePolizaRespDto } from "@/application/dto/response/reporte-poliza-resp.dto";
import { ReportePolizaService } from "@/application/services/reporte-poliza.service";
import { AuthContext } from "@/shared/commons/auth-context";
import { ReqFilterDto } from "@/application/dto/request/req-filter.dto";

export class ReportePolizaController {
  constructor(private readonly reportePolizaService: ReportePolizaService) { }

  private authContext!: AuthContext;

  setRequestContext(authContext: AuthContext) {
    this.authContext = authContext;
  }

  async getReportePolizaStats( reqFilter: ReqFilterDto  ): Promise<RespDto<ReportePolizaRespDto>> {
    const data = await this.reportePolizaService.getActiveProspectosCount(reqFilter, this.authContext.nickname);
    return RespDto.success(data);
  }

}