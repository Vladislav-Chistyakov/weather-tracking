<script setup>
import {onMounted, ref, toRef} from 'vue'

const API_KEY = '13b55ccc56185568d11b8e020229a105'


const props = defineProps({
  lat: {
    type: Number,
    default: 58.000
  },
  lon: {
    type: Number,
    default: 56.316
  }
})

const latRef = toRef(props.lat)
const lonRef = toRef(props.lon)

const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latRef.value}&lon=${lonRef.value}&appid=${API_KEY}&units=metric`
const apiPro = `https://api.openweathermap.org/data/2.5/forecast?lat=${latRef.value}&lon=${lonRef.value}&appid=${API_KEY}&units=metric`

onMounted(async () => {
  // TODO Работает только с VPN
  const time = new Date().getTime()

  const test = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latRef.value}&lon=${lonRef.value}&dt=${time}&appid=${API_KEY}`
  const data = ref(null)

  console.log(2)
  await fetch(api)
      .then((res) => {
        console.warn('res', res)
        data.value = res
      })
      .catch((err) => (console.error('err', err.message)))
      .finally(() => console.log(3))
  console.log(4)
})

</script>

<!--<script setup>-->
<!--import { useFetch } from './fetch.js'-->
<!--const apiKey = '13b55ccc56185568d11b8e020229a105'-->
<!--const test = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`-->
<!--const { data, error } = useFetch(test)-->
<!--</script>-->

<template>
  <div></div>
</template>

<style scoped>

</style>
