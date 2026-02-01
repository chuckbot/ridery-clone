import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FastifyPluginAsync } from 'fastify';
import autoload from '@fastify/autoload';
import cors from '@fastify/cors'; // <--- Agrega este import [cite: 2026-01-24]

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export const app: FastifyPluginAsync = async (fastify, opts) => {
  // 0. Registro de CORS (Debe ir antes de las rutas) [cite: 2026-01-24]
  await fastify.register(cors, {
    origin: ["http://localhost:3000"] // Tu URL de Nuxt 4 [cite: 2026-01-24]
  });

  // 1. Cargamos Los Plugins (DB, Auth, EventEmitters, etc.)
  fastify.register(autoload, {
    dir: join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // 2. Cargamos las Rutas
  fastify.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: Object.assign({ prefix: '/api' }, opts),
  });
};

export default app;