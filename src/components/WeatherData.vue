<script setup>
import {onMounted, ref, toRef} from 'vue'
import { dateObject } from './date.js'

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

const data = ref(null)

const pending = ref(true)

const latRef = toRef(props.lat)
const lonRef = toRef(props.lon)

const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latRef.value}&lon=${lonRef.value}&appid=${API_KEY}&units=metric`
// const apiPro = `https://api.openweathermap.org/data/2.5/forecast?lat=${latRef.value}&lon=${lonRef.value}&appid=${API_KEY}&units=metric`
// const test = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latRef.value}&lon=${lonRef.value}&dt=${time}&appid=${API_KEY}`

const getWeather = async () => {
  pending.value = true
  try {
    await fetch(api).then(async (res) => {
      data.value = await res.json()
      console.warn('getWeather: ', data.value)
      parseDateWeather()
    })
  }
  catch (error) {
    console.error('getWeather: ', error)
  }
  finally {
    pending.value = false
  }
}

onMounted(async () => {
  // TODO Работает только с VPN
  await getWeather()
})

const dateParse = ref({
  city: '',
  temp: null,
  tempMin: null,
  tempMax: null,
  weather: '',
  day: '',
  dayOfTheWeek: '',
  month: '',
})

function parseDateWeather() {
  dateParse.value.city = data.value?.name ?? ''
  dateParse.value.temp = data.value?.main.temp ?? null
  dateParse.value.tempMin = data.value?.main['temp_min'] ?? null
  dateParse.value.tempMax = data.value?.main['temp_max'] ?? null
  dateParse.value.weather = data.value?.weather.map(item => item.main).join()
  dateParse.value.day = dateObject.dayOfTheMonth
  dateParse.value.dayOfTheWeek = dateObject.dayOfTheWeek
  dateParse.value.month = dateObject.month
}

</script>

<template>
  <div>
    <button @click="getWeather">получение погоды</button>
    <div v-if="pending">Загрузка...</div>
    <div>
      <h2> Парс данных </h2>
      <div>
        <pre>
          {{ dateParse }}
        </pre>
        <pre>
          {{ data }}
        </pre>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
