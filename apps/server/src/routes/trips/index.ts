import { FastifyPluginAsync } from 'fastify';
import { TripSchema } from '@ridery/shared';

const tripRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', async (request, reply) => {
    // Validamos el body con el esquema compartido
    const tripData = TripSchema.parse(request.body);

    // Guardamos en DB
    const { db } = fastify.mongo;
    const result = await db?.collection('trips').insertOne(tripData);

    // Emitimos el evento de "Viaje Creado"
    fastify.events.emit('TRIP_CREATED', { tripId: result?.insertedId, ...tripData });

    return { success: true, id: result?.insertedId };
  });
};

export default tripRoutes;