// apps/server/src/plugins/mongodb.ts
import mongoose from 'mongoose';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ridery';
    
    // Conectamos Mongoose
    await mongoose.connect(uri);

    // Decoramos fastify con mongoose por si lo necesitas fuera de los modelos
    fastify.decorate('mongoose', mongoose);
    
    fastify.log.info('🍃 Conexión a MongoDB vía Mongoose establecida en Coro');
  } catch (error) {
    fastify.log.error({ err: error }, '❌ Error conectando a MongoDB');
    process.exit(1);
  }
});

declare module 'fastify' {
  interface FastifyInstance {
    mongoose: typeof import('mongoose');
  }
}