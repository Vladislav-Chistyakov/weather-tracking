<script setup>
import {onMounted, ref} from 'vue'
// import { useFetch } from '/fetch.js'

// const data = ref(null)
// const error = ref(null)
const lat = '58.000'
const lon = '56.316'
const cnt = '7'

const apiKey = '13b55ccc56185568d11b8e020229a105'
const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
const apiPro = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

// const { data, error } = useFetch(test)


onMounted(async () => {
  // TODO Работает только с VPN
  const time = new Date().getTime()
  console.warn('1111', api)
  const test = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${apiKey}`
  await fetch(api)
      .then((res) => console.warn('res', res))
      .then((json) => (data.value = json))
      .catch((err) => (console.error('err', err)))
  console.warn('data', data.value)
  console.warn('data', data.value)
})

</script>

<!--<script setup>-->
<!--import { useFetch } from './fetch.js'-->
<!--const apiKey = '13b55ccc56185568d11b8e020229a105'-->
<!--const test = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`-->
<!--const { data, error } = useFetch(test)-->
<!--</script>-->

<template>
  <div></div>
</template>

<style scoped>

</style>
