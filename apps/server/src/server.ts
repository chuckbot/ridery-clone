import Fastify from 'fastify';
import { app } from './app.js';

const fastify = Fastify({
  logger: true
});

// Registrar la lógica principal
fastify.register(app);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Server de Ridery corriendo en puerto 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();