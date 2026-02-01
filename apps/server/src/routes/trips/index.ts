import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FastifyPluginAsync } from 'fastify';
import cors from '@fastify/cors'; // <--- Agrega este import [cite: 2026-01-24]
import { Trip } from '@ridery/shared'; // O la ruta relativa a tu package shared

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

export const app: FastifyPluginAsync = async (fastify, opts) => {
  // 0. Registro de CORS (Debe ir antes de las rutas) [cite: 2026-01-24]
  await fastify.register(cors, {
    origin: ["http://localhost:3000"] // Tu URL de Nuxt 4 [cite: 2026-01-24]
  });

  // 1. Definición del Endpoint POST
  fastify.post<{ Body: Trip }>('/', async (request, reply) => {
    const tripData = request.body;
    
    // FIX LOG: Pasamos el objeto primero para que sea indexable en los logs
    fastify.log.info({ tripData }, '🚕 Solicitud de viaje recibida en Coro');

    // FIX SPREAD: Ahora que tripData es de tipo Trip (un objeto), el spread es legal
    fastify.events.emit('TRIP_CREATED', { 
      ...tripData, 
      tripId: crypto.randomUUID() 
    });

    return reply.code(201).send({ 
      success: true, 
      message: 'Viaje solicitado con éxito' 
    });
  });
};