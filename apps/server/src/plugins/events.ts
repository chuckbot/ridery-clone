import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { EventEmitter } from 'node:events';

export default fp(async (fastify: FastifyInstance) => {
  const eventEmitter = new EventEmitter();
  
  // Decoramos la instancia de fastify para usarlo en las rutas
  fastify.decorate('events', eventEmitter);
});

// Tipado para TypeScript
declare module 'fastify' {
  export interface FastifyInstance {
    events: EventEmitter;
  }
}