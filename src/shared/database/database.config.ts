// src/shared/database/database.config.ts
import { Pool } from 'pg';

export class DatabaseConfig {
  private static instance: Pool;

  static getInstance(): Pool {
    if (!DatabaseConfig.instance) {
      // 👉 Asegurar que dotenv se carga antes de leer process.env
      DatabaseConfig.instance = new Pool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });
    }
    return DatabaseConfig.instance;
  }
}