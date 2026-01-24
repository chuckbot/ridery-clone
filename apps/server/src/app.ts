import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FastifyPluginAsync } from 'fastify';
import autoload from '@fastify/autoload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export const app: FastifyPluginAsync = async (fastify, opts) => {
  // 1. Cargamos los Plugins (DB, Auth, EventEmitters, etc.)
  // Todo lo que esté en /plugins se registrará automáticamente
  fastify.register(autoload, {
    dir: join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // 2. Cargamos las Rutas
  // Todo lo que esté en /routes se convertirá en un endpoint
  fastify.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: Object.assign({ prefix: '/api' }, opts),
  });
};

export default app;