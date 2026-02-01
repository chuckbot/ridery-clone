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
            <v-btn color="primary" size="large" block :loading="isLoading" @click="submitTrip">
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
import { TripSchema } from '@ridery/shared' // Tu contrato de datos
const { createTrip } = useApi()

const isFormValid = ref(false)
const isLoading = ref(false)
const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

// Data inicial con puntos reales de Coro
const tripData = ref({
  origin: { lat: 11.4111, lng: -69.6732 }, // Plaza Falcón
  destination: { lat: 11.4125, lng: -69.6775 }, // Paseo Talavera
  status: 'PENDING'
})

const submitTrip = async () => {
  isLoading.value = true

  // 1. Validar con Zod antes de enviar
  const validation = TripSchema.safeParse(tripData.value)

  if (!validation.success) {
    snackbarText.value = "Datos de ubicación inválidos"
    snackbarColor.value = "error"
    showSnackbar.value = true
    isLoading.value = false
    return
  }

  try {
    // 2. Enviar al backend de Fastify que ya tienes en Docker
    const response = await $fetch('http://localhost:3000/api/trips', {
      method: 'POST',
      body: validation.data
    })

    snackbarText.value = "¡Viaje solicitado! Buscando conductores..."
    snackbarColor.value = "success"
    showSnackbar.value = true
  } catch (error) {
    snackbarText.value = "Error al conectar con el servidor"
    snackbarColor.value = "error"
    showSnackbar.value = true
  } finally {
    isLoading.value = false
  }
}

const handleRequestTrip = async () => {
  try {
    isLoading.value = true
    const result = await createTrip(tripData.value)

    // Si el backend disparó el evento TRIP_CREATED, aquí ya tenemos el ID
    console.log(`¡Viaje ${result.tripId} en camino por Coro!`)
  } catch (e) {
    // Manejo de errores senior
  } finally {
    isLoading.value = false
  }
}
</script>