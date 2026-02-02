// apps/server/src/app.ts
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FastifyPluginAsync } from 'fastify';
import { app as tripRoutes } from './routes/trips/index.js';
import eventsPlugin from './plugins/events.js';
import mongodbPlugin from './plugins/mongodb.js';
// 1. Importa el inicializador del Dispatcher
import { initDispatchService } from './services/dispatchService.js';

export const app: FastifyPluginAsync = async (fastify, opts) => {
  console.log("██████████ ESTOY USANDO EL CÓDIGO NUEVO ██████████");

  // 1. Registramos plugins de base PRIMERO
  await fastify.register(eventsPlugin);
  await fastify.register(mongodbPlugin);

  // 2. INICIALIZAMOS EL DISPATCHER AQUÍ
  // Ahora el servicio estará escuchando el evento 'TRIP_CREATED'
  initDispatchService(fastify);

  // 3. Registramos las rutas
  fastify.register(tripRoutes, { prefix: '/api/trips' });
};