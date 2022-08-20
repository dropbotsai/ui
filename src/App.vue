<template>
  <div v-if="locationAccessDenied">
    <button>location access required</button>
  </div>
  <div v-if="location">
    <p>Lat: {{ lat }}</p>
    <p>Long: {{ long }}</p>
    <p>Accuracy: {{ acc.toLocaleString() }} meters</p>
  </div>
  <div>
    <button @click="getLocation">Locate</button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import HelloWorld from './components/HelloWorld.vue'

  const location = ref(false)
  const locationAccessDenied = ref(false)
  const lat = ref(null)
  const long = ref(null)
  const acc = ref(null)

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  const locationSuccess = pos => {
    const crd = pos.coords

    location.value = true
    lat.value = crd.latitude
    long.value = crd.longitude
    acc.value = crd.accuracy

    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
  }

  const locationError = err => {
    locationAccessDenied.value = true
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions)
  }

  onMounted(() => {
    console.log('mounted')
    // getLocation()
  })
</script>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
