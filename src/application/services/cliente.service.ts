import { IClienteRepository } from "@/domain/repositories/cliente.repository.interface";
import { ClienteStatsDto } from "../dto/cliente-stats.dto";

export class ClienteService {
  constructor(private readonly userRepository: IClienteRepository) {}

  async getActiveUsersCount(): Promise<ClienteStatsDto> {
    const count = await this.userRepository.countActiveUsers();
    return new ClienteStatsDto(count);
  }
}