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
  <div>
    <button @click="createBot">Create Bot</button>
  </div>
  <div>
    <a href="http://localhost:8000/auth/logout">
      <button>Logout</button>
    </a>
  </div>
  <div>
    <div v-for="bot in bots">
      {{ bot.name }}: {{ bot.latitude }},{{ bot.longitude }} - {{ bot.ip_address }} - {{ bot.created_at }}
      <span><button @click="deleteBot(bot.id)">del</button></span>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, onMounted } from 'vue'

  const axios = inject('axios')

  const location = ref(false)
  const locationAccessDenied = ref(false)
  const lat = ref(null)
  const long = ref(null)
  const acc = ref(null)
  const bots = ref([])

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
    console.log('pos', pos)
    console.log('crd', crd)
  }

  const locationError = err => {
    locationAccessDenied.value = true
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions)
  }

  const createBot = () => {
    const url = '/api/v1/bots'
    const payload = { name: 'TestBot', latitude: lat.value, longitude: long.value, accuracy: acc.value }

    axios.post(url, payload).then(resp => {
      console.log(resp)
      bots.value.unshift(resp.data)
    })
  }

  const deleteBot = id => {
    const url = `/api/v1/bots/${id}`

    axios.delete(url).then(resp => {
      if (resp.status == 200) {
        bots.value = bots.value.filter(x => x.id != id)
      }
    })
  }

  const getBots = () => {
    const url = '/api/v1/bots'

    axios.get(url).then(resp => {
      console.log('list', resp.data)
      bots.value = resp.data
    })
  }

  onMounted(() => {
    console.log('mounted')
    getBots()
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
