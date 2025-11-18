// Cargar variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// local-server.ts
import cors from 'cors';
import express from 'express';

// Iniciando la aplicacion
import { App } from './src/app';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializar la aplicación
const sigapApp = new App();
const controller = sigapApp.getReportePolizaController();

const auth = {
    userId: "mockUserId",
    nickname: "lMartel",
    role: "mockRole",
    clientIp: "mockClientIp",
};
controller.setRequestContext(auth);

// Rutas
app.post('/reporte/poliza/stats', async (req, res) => {
  try {
    const result = await controller.getReportePolizaStats( req.body );
    res.json( result );
  } catch (error) {
    console.error('Error:', error);
    const statusCode = error.name === 'ClienteNotFoundException' ? 404 : 500;
    res.status(statusCode).json({
      message: error.message || 'Internal server error',
      error: error.name || 'UnknownError'
    });
  }
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor SIGAP ejecutándose en http://localhost:${port}`);
  console.log(`📊 Endpoint disponible: http://localhost:${port}/reporte/poliza/stats`);
  console.log(`❤️ Health check: http://localhost:${port}/health`);
});
