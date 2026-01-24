import { FastifyInstance } from 'fastify';
import { Trip } from '@ridery/shared';

export const initDispatchService = (fastify: FastifyInstance) => {
  fastify.events.on('TRIP_CREATED', async (trip: Trip & { tripId: string }) => {
    const { db } = fastify.mongo;
    fastify.log.info(`[Dispatcher] Buscando conductores para viaje ${trip.tripId} en Coro...`);

    try {
      // 1. Buscamos conductores disponibles en un radio de 5km
      const nearbyDrivers = await db?.collection('drivers').find({
        status: 'AVAILABLE',
        location: {
          $near: {
            $geometry: { 
              type: "Point", 
              coordinates: [trip.origin.lng, trip.origin.lat] // [longitud, latitud]
            },
            $maxDistance: 5000 // Metros
          }
        }
      }).limit(5).toArray();

      if (nearbyDrivers && nearbyDrivers.length > 0) {
        const selectedDriver = nearbyDrivers[0];
        fastify.log.info(`[Dispatcher] ¡Éxito! Conductor ${selectedDriver._id} asignado.`);
        
        // 2. Emitimos el siguiente evento en la cadena
        fastify.events.emit('DRIVER_ASSIGNED', { 
          tripId: trip.tripId, 
          driverId: selectedDriver._id 
        });
      } else {
        fastify.log.warn(`[Dispatcher] No hay conductores cerca para el viaje ${trip.tripId}`);
      }
    } catch (err) {
      fastify.log.error(err, "[Dispatcher] Error en la búsqueda de conductores");
    }
  });
};