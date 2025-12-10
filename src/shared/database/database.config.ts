import { Pool } from 'pg';

export class DatabaseConfig {
  private static instance: Pool;

  static getInstance(): Pool {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new Pool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        
        // 🔧 SSL obligatorio para Render
        ssl: {
          rejectUnauthorized: false  // Render requiere SSL siempre
        },
        
        // 🔧 Configuración optimizada para Render Basic
        max: 5,                              // Máximo 5 conexiones (Render Basic es limitado)
        min: 0,                              // NO mantener conexiones idle (Render las cierra)
        idleTimeoutMillis: 10000,            // Cierra conexiones idle después de 10 segundos
        connectionTimeoutMillis: 10000,      // 10 segundos para conectar (latencia de red)
        
        // 🆕 Crítico para Render
        allowExitOnIdle: true,               // Permite que el pool se vacíe completamente
        
        // 🆕 Keep-alive más agresivo
        keepAlive: true,
        keepAliveInitialDelayMillis: 5000,   // Ping cada 5 segundos (antes de que Render cierre)
      });

      // 🆕 Manejo de errores y reconexión
      DatabaseConfig.instance.on('error', (err, client) => {
        console.error('❌ Error en pool PostgreSQL (Render):', err.message);
        // No hacer nada más - el pool manejará la reconexión
      });

      // 🆕 Evento de conexión
      DatabaseConfig.instance.on('connect', (client) => {
        console.log('✅ Nueva conexión establecida con Render PostgreSQL');
      });

      // 🆕 Evento de remoción de cliente
      DatabaseConfig.instance.on('remove', (client) => {
        console.log('🔄 Conexión removida del pool');
      });

      console.log('✅ Pool PostgreSQL configurado para Render');
    }
    return DatabaseConfig.instance;
  }

  // 🆕 Método para cerrar el pool limpiamente
  static async close(): Promise<void> {
    if (DatabaseConfig.instance) {
      await DatabaseConfig.instance.end();
      console.log('🛑 Pool PostgreSQL cerrado');
    }
  }
}