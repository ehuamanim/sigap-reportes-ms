// src/presentation/controllers/user.controller.ts

import { ClienteService } from "@/application/services/cliente.service";
import { AuthContext } from "@/shared/commons/auth-context";

export class ClienteController {
  constructor(private readonly userService: ClienteService) { }

  private authContext!: AuthContext;

  setRequestContext(authContext: AuthContext) {
    this.authContext = authContext;
  }

  async getActiveClientesStats() {
    return await this.userService.getActiveClientsCount();
  }

  async getActiveProspectosStats() {
    return await this.userService.getActiveProspectosCount();
  }
}