// apps/server/src/routes/trips/plugins/index.ts
import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  // Este plugin está aquí para satisfacer el autoload y evitar errores de ENOENT
  fastify.log.info('✅ Plugins de rutas de viajes cargados correctamente');
}