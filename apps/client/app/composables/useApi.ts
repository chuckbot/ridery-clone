import { type Trip, TripSchema } from '@ridery/shared'

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = 'http://localhost:3001/api' // O usa variables de entorno

  const createTrip = async (tripData: any) => {
    // 1. Validación preventiva antes de salir del cliente
    const validation = TripSchema.safeParse(tripData)
    if (!validation.success) throw new Error('Datos inválidos')

    // 2. Petición tipada
    return await $fetch<Trip & { tripId: string }>(`${baseUrl}/trips`, {
      method: 'POST',
      body: validation.data
    })
  }

  return {
    createTrip
  }
}