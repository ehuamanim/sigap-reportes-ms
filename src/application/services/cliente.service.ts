import { IClienteRepository } from "@/domain/repositories/cliente.repository.interface";
import { ClienteStatsDto } from "../dto/cliente-stats.dto";

export class ClienteService {
  constructor(private readonly userRepository: IClienteRepository) {}

  async getActiveClientsCount(): Promise<ClienteStatsDto> {
    const count = await this.userRepository.countActiveClientes();
    return new ClienteStatsDto(count);
  }

  async getActiveProspectosCount(): Promise<ClienteStatsDto> {
    const count = await this.userRepository.countActiveProspectos();
    return new ClienteStatsDto(count);
  }
}