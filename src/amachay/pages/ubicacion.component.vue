<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="successMessage" class="success">
      {{ successMessage }}
    </div>
    <form @submit.prevent="addPersona">
      <pv-input-text v-model="newPersona.nombre" placeholder="Nombre" required />
      <pv-input-text v-model="newPersona.apellido" placeholder="Apellido" required />
      <pv-button type="submit" label="Registrar" :disabled="isLoading" class="register-button">
        <span v-if="isLoading">Registrando...</span>
        <span v-else>Registrar</span>
      </pv-button>
    </form>
    <div v-for="(persona, index) in personas" :key="persona.id" :class="[index === 0 ? 'first-card' : '', 'card']">
      <h2>{{ persona.nombre }} {{ persona.apellido }}</h2>
      <p>{{ persona.direccion }}</p>
      <a :href="persona.googleMapsUrl" target="_blank" class="maps-button">Ver en Google Maps</a>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {PersonasApiService} from '../services/personas-api.service.js';
export default {
  name: "ubicacion",
  setup() {
    const personasService = new PersonasApiService();
    const personas = ref([]);
    const error = ref(null);
    const successMessage = ref('');
    const newPersona = ref({ nombre: '', apellido: '', direccion: '', googleMapsUrl: '' });
    const isLoading = ref(false);

    const addPersona = async () => {
      isLoading.value = true;
      newPersona.value.id = Date.now();

      // Obtener la ubicación actual del usuario
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          newPersona.value.direccion = `Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`;
          newPersona.value.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`;

          await personasService.create(newPersona.value);
          personas.value.unshift(newPersona.value);
          newPersona.value = { nombre: '', apellido: '', direccion: '', googleMapsUrl: '' };
          successMessage.value = 'Registro exitoso';

          // Clear the success message after 2 seconds
          setTimeout(() => {
            successMessage.value = '';
          }, 3000);

          isLoading.value = false;
        }, (error) => {
          console.error("Error al obtener la ubicación:", error);
          error.value = error.toString();
          isLoading.value = false;
        });
      } else {
        console.error("Geolocalización no es soportada por este navegador.");
        isLoading.value = false;
      }
    };
    onMounted(async () => {
      try {
        const response = await personasService.getAll();
        personas.value = response;
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        error.value = error.toString();
      }
    });

    return {
      personas,
      error,
      successMessage,
      newPersona,
      addPersona,
      isLoading
    };
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
}

.first-card {
  margin-top: 20px;
}

.error {
  color: red;
}

.success {
  color: green;
  font-size: 2em;
}

.maps-button {
  display: inline-block;
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  text-decoration: none;
  border-radius: 4px;
}
.register-button {
  margin-left: 20px;
}
</style>