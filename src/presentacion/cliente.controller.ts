// src/presentation/controllers/user.controller.ts

import { ClienteService } from "@/application/services/cliente.service";

export class ClienteController {
  constructor(private readonly userService: ClienteService) {}

  async getActiveUsersStats() {
    return await this.userService.getActiveUsersCount();
  }
}