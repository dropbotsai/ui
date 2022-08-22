<template>
  <div v-if="loaded">
    <div v-if="!loggedIn">
      <Signup />
    </div>
    <div v-if="loggedIn">
      <Dashboard />
    </div>
  </div>
</template>

<script setup>
  import { inject, onMounted, ref } from 'vue'
  import Signup from './components/Sessions/Signup.vue'
  import Dashboard from './components/Dashboard.vue'

  const axios = inject('axios')
  const loggedIn = ref(false)
  const loaded = ref(false)

  onMounted(() => {
    const url = '/auth/status'
    axios
      .get(url)
      .then(resp => {
        const user = resp.data
        if (user.email) {
          loggedIn.value = true
        }
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        loaded.value = true
      })
  })
</script>
