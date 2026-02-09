import { ProduccionRespDto } from "../dto/response/produccion-resp.dto";
import { IProduccionRepository } from "@/domain/repositories/produccion.repository.interface";


export class ProduccionService {
  constructor(private readonly produccionRepository: IProduccionRepository) { }

  async getProduccionByAnio( anios: string[] ): Promise<ProduccionRespDto>{
    return this.produccionRepository.getProduccionByAnio( anios );
  }
}