<script setup>
import { computed, onMounted, ref, toRef } from 'vue'
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
const error = ref(false)

const latRef = toRef(props.lat)
const lonRef = toRef(props.lon)

const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latRef.value}&lon=${lonRef.value}&appid=${API_KEY}&units=metric`

const getWeather = async () => {
  pending.value = true
  try {
    await fetch(api).then(async (res) => {
      data.value = await res.json()
      console.warn('getWeather: ', data.value)
      parseDateWeather()
    }).catch(() => error.value = true)
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
  dateParse.value.city = data.value?.name.toUpperCase() ?? ''
  dateParse.value.temp = Math.round(data.value?.main.temp) ?? null
  dateParse.value.tempMin = Math.floor(data.value?.main['temp_min']) ?? null
  dateParse.value.tempMax = Math.ceil(data.value?.main['temp_max']) ?? null
  dateParse.value.weather = data.value?.weather.map(item => item.main).join()
  dateParse.value.day = dateObject.dayOfTheMonth
  dateParse.value.dayOfTheWeek = dateObject.dayOfTheWeek
  dateParse.value.month = dateObject.month
}

const weatherShadow = computed(() => {
  if (dateParse.value.temp > 25) {
    return 'weather__top-shadow-hot';
  } else if (dateParse.value.temp > 15) {
    return 'weather__top-shadow-warm';
  } else if (dateParse.value.temp > 5) {
    return 'weather__top-shadow-mild';
  } else if (dateParse.value.temp > -5) {
    return 'weather__top-shadow-cool';
  } else if (dateParse.value.temp > -15) {
    return 'weather__top-shadow-cold';
  } else {
    return 'weather__top-shadow-very-cold';
  }
})
</script>

<template>
  <div class="weather">
    <button @click="getWeather">получение погоды</button>
    {{ error }}
    <div v-if="pending" class="weather__loading">Загрузка...</div>
    <div v-else-if="!pending && !error" class="weather__container">
      <div class="weather__top">
        <div class="weather__top-img" />
        <div class="weather__top-shadow" :class="weatherShadow" />
        <div class="weather__top-content">
          <div class="weather__top-box">
            <p class="weather__top-description">{{ dateParse.temp }}</p>
            <span class="weather__top-icon">°</span>
          </div>
          <strong class="weather__city">{{ dateParse.city }}</strong>
        </div>
      </div>
      <div class="weather__bottom">
        <p class="weather__bottom-date">{{ `${dateParse.dayOfTheWeek}, ${dateParse.day} ${dateParse.month}` }}</p>
        <div class="weather__bottom-box">
          <div class="weather__bottom-info">
            <p class="weather__bottom-description">{{ dateParse.weather }}</p>
            <p class="weather__bottom-temp">{{ dateParse.tempMin }}
              <span class="weather__bottom-temp-icon">°</span>
              <span class="weather__bottom-temp-slash">/</span>
              {{ dateParse.tempMax }}
              <span class="weather__bottom-temp-icon">°</span>
            </p>
          </div>
          <div class="weather__bottom-icon">{{ dateParse.weather }}</div>
        </div>
      </div>
    </div>
    <div v-else>Возникла ошибка при получении данных</div>
  </div>
</template>

<style scoped>
.weather {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.weather__container {
  min-width: 245px;
  border-radius: 17px;
  overflow: hidden;
  box-shadow: 0 8px 16px 0 #00000040;
}

.weather__top {
  position: relative;
  padding: 21px 24px 146px 24px;
}

.weather__top-img {
  position: absolute;
  inset: 0;
  background-image: url("../../src/assets/img/perm.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: 1;
}

.weather__top-shadow {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

/* Жаркая погода, больше 25°C */
.weather__top-shadow-hot {
  background: linear-gradient(271.24deg, #FF6347 -4.18%, #FF4500 -4.17%, rgba(255, 99, 71, 0.6) 110.03%),
  linear-gradient(324.84deg, rgba(255, 69, 0, 0.2) 14.05%, rgba(255, 160, 122, 0.2) 100%);
}

/* Тепло, от 15 до 25°C */
.weather__top-shadow-warm {
  background: linear-gradient(271.24deg, #FFD587 -4.18%, #FFB74A -4.17%, rgba(222, 194, 123, 0.4) 110.03%),
  linear-gradient(324.84deg, rgba(255, 182, 97, 0.2) 14.05%, rgba(250, 150, 80, 0.15) 100%);
}

/* Комфортная температура, от 5 до 15°C */
.weather__top-shadow-mild {
  background: linear-gradient(271.24deg, #A8E063 -4.18%, #56AB2F -4.17%, rgba(86, 171, 47, 0.5) 110.03%),
  linear-gradient(324.84deg, rgba(152, 251, 152, 0.1) 14.05%, rgba(34, 139, 34, 0.2) 100%);
}

/* Прохладно, от -5 до 5°C */
.weather__top-shadow-cool {
  background: linear-gradient(271.24deg, #6FA1DF -4.18%, #5C88D2 -4.17%, rgba(135, 160, 195, 0.6) 110.03%),
  linear-gradient(324.84deg, rgba(100, 130, 170, 0.15) 14.05%, rgba(90, 115, 155, 0.25) 100%);
}

/* Холодно, от -15 до -5°C */
.weather__top-shadow-cold {
  background: linear-gradient(271.24deg, #7ca4ef -4.18%, #3e6dd3 -4.17%, rgba(90, 110, 150, 0.7) 110.03%),
  linear-gradient(324.84deg, rgba(70, 90, 130, 0.2) 14.05%, rgba(65, 80, 120, 0.3) 100%);
}

/* Очень холодно, ниже -15°C */
.weather__top-shadow-very-cold {
  background: linear-gradient(271.24deg, #6895e0 -4.18%, #1645a8 -4.17%, rgba(29, 60, 119, 0.4) 110.03%),
  linear-gradient(324.84deg, rgba(152, 172, 248, 0.25) 14.05%, rgba(116, 141, 243, 0.35) 100%);
}


.weather__top-content {
  position: relative;
  z-index: 10;
}

.weather__top-box {
  position: relative;
  width: fit-content;
  padding-right: 20px;
}

.weather__top-description, .weather__top-icon {
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  color: white;
}

.weather__top-icon {
  position: absolute;
  top: -8px;
  right: 0;
}

.weather__city {
  color: white;
  font-size: 15px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 1px;
}

.weather__bottom {
  padding: 16px 20px 16px 16px;
}

.weather__bottom-date, .weather__bottom-icon {
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  color: #5E5E5E;
}

.weather__bottom-date {
  margin-bottom: 6px;
}

.weather__bottom-box {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.weather__bottom-info {
  font-size: 15px;
  font-weight: 700;
  line-height: 200px;
  color: #191919;
}

.weather__bottom-description, .weather__bottom-temp, .weather__bottom-temp-icon, .weather__bottom-temp-slash {
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: #C4C4C4;
}

.weather__bottom-description {
  margin-bottom: 2px;
}
</style>
