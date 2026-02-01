<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" rounded="lg">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Pedir un Ridery en Coro</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid">
              <v-text-header class="text-subtitle-2 mb-2">Punto de Partida</v-text-header>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model.number="tripData.origin.lat" label="Latitud" type="number" variant="outlined"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model.number="tripData.origin.lng" label="Longitud" type="number" variant="outlined"
                    density="compact"></v-text-field>
                </v-col>
              </v-row>

              <v-text-header class="text-subtitle-2 mb-2">A dónde vas?</v-text-header>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model.number="tripData.destination.lat" label="Latitud" type="number"
                    variant="outlined" density="compact"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model.number="tripData.destination.lng" label="Longitud" type="number"
                    variant="outlined" density="compact"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" size="large" block :loading="isLoading" @click="handleRequestTrip">
              Solicitar Viaje
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-snackbar v-model="showSnackbar" :color="snackbarColor">
          {{ snackbarText }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { TripSchema } from '@ridery/shared'
const { createTrip } = useApi()

const isFormValid = ref(false)
const isLoading = ref(false)
const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const tripData = ref({
  origin: { lat: 11.4111, lng: -69.6732 },
  destination: { lat: 11.4125, lng: -69.6775 },
  status: 'PENDING',
  timestamp: new Date() // Zod suele preferir strings para fechas en JSON
})

const handleRequestTrip = async () => {
  isLoading.value = true
  tripData.value.timestamp = new Date()

  // 1. Validar con Zod antes de intentar enviar
  const validation = TripSchema.safeParse(tripData.value)

  if (!validation.success) {
    console.log('❌ Error de Zod:', validation.error.format())
    snackbarText.value = "Datos de ubicación inválidos"
    snackbarColor.value = "error"
    showSnackbar.value = true
    isLoading.value = false
    return
  }

  // 2. Si la validación pasa, enviamos al backend de Fastify
  try {
    const result = await createTrip(validation.data) // Usamos validation.data porque ya está tipado

    snackbarText.value = `¡Viaje ${result.tripId || 'registrado'} solicitado con éxito!`
    snackbarColor.value = "success"
    showSnackbar.value = true
    console.log(`✅ Viaje ${result.tripId || 'registrado'} en camino por Coro!`)
  } catch (e) {
    console.error('❌ Error de red:', e)
    snackbarText.value = "Error al conectar con el servidor de Ridery"
    snackbarColor.value = "error"
    showSnackbar.value = true
  } finally {
    isLoading.value = false
  }
}
</script>