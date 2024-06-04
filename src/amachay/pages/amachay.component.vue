<template>
  <div class="container">
    <img id="logo"
         src="https://res.cloudinary.com/drkelnilg/image/upload/v1717450599/imagen_2024-06-03_163639131_pns04t.png"
         alt="Logo"/>
    <h1>Registro de asistencia del cento de salud mental Amachay</h1>
    <pv-button @click="navigateToUbicacion">Acceder a ubicacion de usuario</pv-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: "amachay",
  setup() {
    const router = useRouter();

    const navigateToUbicacion = () => {
      router.push('/ubicacion');
    };

    return {
      navigateToUbicacion
    };
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

#logo {
  width: 200px;
}

h1 {
  font-size:50px;
  font-weight: bold;
}


</style>