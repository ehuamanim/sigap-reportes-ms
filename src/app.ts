// src/app.ts
import { ProduccionService } from './application/services/produccion.service';
import { ReportePolizaService } from './application/services/reporte-poliza.service';
import { PgProduccionRepository } from './domain/repositories/pg-produccion-poliza.repository';
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
    const produccionRepository = new PgProduccionRepository(pool);

    const reportePolizaService = new ReportePolizaService(reportePolizaRepository);
    const produccionService = new ProduccionService( produccionRepository );
    this.reportePolizaController = new ReportePolizaController(reportePolizaService, produccionService);
  }

  getReportePolizaController(): ReportePolizaController {
    return this.reportePolizaController;
  }
}