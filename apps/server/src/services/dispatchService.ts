// apps/server/src/services/dispatchService.ts
import { FastifyInstance } from 'fastify';
import { Trip } from '@ridery/shared';
import { Driver } from '../models/driver.model.js'; // Importamos el modelo nuevo

export const initDispatchService = (fastify: FastifyInstance) => {
  fastify.events.on('TRIP_CREATED', async (trip: Trip & { tripId: string }) => {
    fastify.log.info(`[Dispatcher] Buscando conductores para viaje ${trip.tripId} en Coro...`);

    try {
      // Usamos el modelo con una sintaxis mucho más limpia
      const nearbyDriver = await Driver.findOne({
        status: 'AVAILABLE',
        location: {
          $near: {
            $geometry: { 
              type: "Point", 
              coordinates: [trip.origin.lng, trip.origin.lat] 
            },
            $maxDistance: 5000 // 5km
          }
        }
      });

      if (nearbyDriver) {
        fastify.log.info(`[Dispatcher] ¡Éxito! Conductor ${nearbyDriver.name} asignado.`);
        
        // Notificamos la asignación
        fastify.events.emit('DRIVER_ASSIGNED', {
          tripId: trip.tripId,
          driverId: nearbyDriver._id
        });
      } else {
        fastify.log.warn(`[Dispatcher] No hay conductores cerca para el viaje ${trip.tripId}`);
      }
    } catch (err) {
      fastify.log.error(err, "[Dispatcher] Error en la búsqueda de conductores");
    }
  });
};