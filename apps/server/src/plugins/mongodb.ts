import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongodb from '@fastify/mongodb';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(mongodb, {
    // En producción usarías variables de entorno
    forceClose: true,
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/ridery'
  });
});