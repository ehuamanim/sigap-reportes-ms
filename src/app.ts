// src/app.ts
import { ClienteService } from './application/services/cliente.service';
import { PgClienteRepository } from './domain/repositories/pg-cliente.repository';
import { ClienteController } from './presentacion/cliente.controller';
import { DatabaseConfig } from './shared/database/database.config';

export class App {
  private clienteController: ClienteController;

  constructor() {
    this.initializeDependencies();
  }

  private initializeDependencies() {
    // Dependency Injection (DIP - Dependency Inversion Principle)
    const pool = DatabaseConfig.getInstance();
    const clienteRepository = new PgClienteRepository(pool);
    const clienteService = new ClienteService(clienteRepository);
    this.clienteController = new ClienteController(clienteService);
  }

  getUserController(): ClienteController {
    return this.clienteController;
  }
}