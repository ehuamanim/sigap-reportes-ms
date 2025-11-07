// src/app.ts
import { ReportePolizaService } from './application/services/reporte-poliza.service';
import { PgReportePolizaRepository } from './domain/repositories/pg-reporte-poliza.repository';
import { ReportePolizaController } from './presentacion/reporte-poliza.controller';
import { DatabaseConfig } from './shared/database/database.config';

export class App {
  private reportePolizaController: ReportePolizaController;

  constructor() {
    this.initializeDependencies();
  }

  private initializeDependencies() {
    // Dependency Injection (DIP - Dependency Inversion Principle)
    const pool = DatabaseConfig.getInstance();
    const reportePolizaRepository = new PgReportePolizaRepository(pool);
    const reportePolizaService = new ReportePolizaService(reportePolizaRepository);
    this.reportePolizaController = new ReportePolizaController(reportePolizaService);
  }

  getReportePolizaController(): ReportePolizaController {
    return this.reportePolizaController;
  }
}