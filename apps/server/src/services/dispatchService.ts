import { FastifyInstance } from 'fastify';
import { Trip } from '@ridery/shared';

export const initDispatchService = (fastify: FastifyInstance) => {
  fastify.events.on('TRIP_CREATED', async (trip: Trip & { tripId: string }) => {
    const { db } = fastify.mongo;
    
    fastify.log.info(`[Consumer] Procesando solicitud de viaje: ${trip.tripId}`);

    // Simulación de búsqueda geoespacial en MongoDB
    const nearbyDrivers = await db?.collection('drivers').find({
      status: 'AVAILABLE',
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [trip.origin.lng, trip.origin.lat] },
          $maxDistance: 5000 // 5km
        }
      }
    }).limit(3).toArray();

    if (nearbyDrivers && nearbyDrivers.length > 0) {
      const selectedDriver = nearbyDrivers[0];
      fastify.log.info(`[Consumer] Conductor ${selectedDriver._id} asignado al viaje ${trip.tripId}`);
      
      // Emitimos el siguiente evento en la cadena
      fastify.events.emit('DRIVER_ASSIGNED', { 
        tripId: trip.tripId, 
        driverId: selectedDriver._id 
      });
    } else {
      fastify.log.warn(`[Consumer] No se encontraron conductores para el viaje ${trip.tripId}`);
    }
  });
};