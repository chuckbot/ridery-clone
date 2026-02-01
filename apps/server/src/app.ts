import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FastifyPluginAsync } from 'fastify';
import { app as tripRoutes } from './routes/trips/index.js'; // Ajuste vital
import eventsPlugin from './plugins/events.js'; // Importamos tus eventos
import mongodbPlugin from './plugins/mongodb.js'; // Importamos mongo

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export const app: FastifyPluginAsync = async (fastify, opts) => {
  console.log("██████████ ESTOY USANDO EL CÓDIGO NUEVO ██████████");

  // 1. Registramos plugins de base PRIMERO
  await fastify.register(eventsPlugin); 
  await fastify.register(mongodbPlugin);

  // 2. Registramos las rutas después de que los plugins estén listos
  fastify.register(tripRoutes, { prefix: '/api/trips' });
};