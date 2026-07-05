import { ProduccionRespDto } from "@/application/dto/response/produccion-resp.dto";


export interface IProduccionRepository {

  getProduccionByAnio( anios: string[] ): Promise<ProduccionRespDto>;

  getProduccionByAnioPrima( anios: string[] ): Promise<ProduccionRespDto>;

}