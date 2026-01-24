import { TripSchema } from '@ridery/shared'

export const useTripValidation = () => {
  const validateTrip = (data: any) => {
    // Usamos el esquema que definiste en el paquete compartido
    const result = TripSchema.safeParse(data)
    
    if (!result.success) {
      return {
        isValid: false,
        errors: result.error.format()
      }
    }
    
    return {
      isValid: true,
      data: result.data
    }
  }

  return { validateTrip }
}