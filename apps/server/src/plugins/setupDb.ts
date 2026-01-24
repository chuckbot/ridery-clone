import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  const { db } = fastify.mongo;
  if (db) {
    // Creamos el índice geoespacial en la colección de conductores
    await db.collection('drivers').createIndex({ location: "2dsphere" });
    fastify.log.info("Índice geoespacial '2dsphere' asegurado.");
  }
});