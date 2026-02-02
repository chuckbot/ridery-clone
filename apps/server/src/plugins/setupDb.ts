// apps/server/src/plugins/setupDb.ts
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  // Verificamos que el plugin de mongo ya esté cargado
  if (!fastify.mongo) {
    throw new Error('El plugin fastify-mongodb debe ser registrado antes que setupDb');
  }

  const { db } = fastify.mongo;
  
  if (db) {
    await db.collection('drivers').createIndex({ location: "2dsphere" });
    fastify.log.info("✅ Índice geoespacial '2dsphere' verificado en MongoDB");
  }
});

// Esta sección es CRÍTICA para que el GitHub Action no falle por tipos
declare module 'fastify' {
  interface FastifyInstance {
    mongo: {
      db: any; // O import('mongodb').Db si tienes el paquete instalado
      client: any;
    };
  }
}