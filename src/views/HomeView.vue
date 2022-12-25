<template>
    <!-- Container -->
    <section
      id="bg_dashboard"
      class="min-h-screen max-h-screen w-full flex flex-col bg-gradient-to-b from-blue-700 to-cyan-500 overflow-auto">

        <formSelectRegion />

        <!-- max width -->
        <div class="flex-1 w-full max-w-4xl m-auto px-6 lg:px-0">

          <!-- region search section -->
          <div class="w-full flex items-center mt-10 pb-3 border-b-2 md:border-b-4 border-neutral-200/70">
            <div
              @click="showSelectRegion"
              class="px-1 md:px-1.5 pt-0.5 md:pt-1.5 md:pb-0.5 bg-neutral-200/70 hover:bg-neutral-200/90 rounded cursor-pointer">
                <font-awesome-icon class="text-blue-700 text-md md:text-xl" :icon="faMapMarkedAlt"/>
            </div>
            <p
              @click="showSelectRegion" 
              class="ml-4 tex-md md:text-xl text-left text-neutral-200/90 cursor-pointer capitalize">
                <template v-if="userRegion.city == null">
                  {{ userRegion }}
                </template>
                <template v-else>
                  {{ userRegion.city }}, {{ userRegion.province }}, {{ userRegion.country }} 
                </template>
            </p>
          </div>

          <!-- source by -->
          <div class="w-full flex justify-between mt-1 mb-10">
            <p class="text-sm text-neutral-200/70">
              made with <span class="text-red-600">&#9829;</span> by <a href="https://github.com/korospace/">korospace</a>
            </p>
            <p class="text-sm text-neutral-200/70">
              source by <a href="https://data.bmkg.go.id/prakiraan-cuaca/" class="lowercase underline underline-offset-2">data.bmkg.go.id</a>
            </p>
          </div>

          <!-- weather skeleton -->
          <div v-if="showWeatherSkeleton" class="w-full h-64 p-3 bg-neutral-200/70 rounded animate-pulse">
          </div>

          <!-- 404 -->
          <div v-if="showWeather404" class="w-full h-64 flex justify-center items-center p-3 bg-neutral-200/70 rounded">
            <img :src="getImage('','404.png')" class="w-40 ml-3 opacity-50">
          </div>

          <!-- weather cards -->
          <div 
            v-for="(w,name) in weatherDistrict" :key="w"
            class="relative w-full mb-4 p-3 text-neutral-700/90 bg-neutral-200/70 rounded overflow-hidden">
              <div
                class="absolute top-4 right-4 px-1.5 pt-0.5 bg-neutral-200/70 hover:bg-neutral-200/90 rounded duration-300 cursor-pointer">
                  <div @click="toggleCardOnClick" class="absolute z-20 top-0 bottom-0 left-0 right-0 top-layer">
                  </div>
                  <div id="arrow_down">
                    <font-awesome-icon class="text-md" :icon="faAngleDown"/>
                  </div>
              </div>
              
              <!-- region & date section -->
              <h1 class="text-left text-xl sm:text-2xl md:text-3xl font-medium capitalize">
                {{ name }}
              </h1>
              <h2 class="text-left text-sm sm:text-md capitalize mt-1">
                {{ dateNow().strDay }}, {{ dateNow().numDay }} {{ dateNow().month }} {{ dateNow().time }}
              </h2>
              
              <!-- weather now section -->
              <div class="w-full flex flex-col sm:flex-row">
                  <div class="flex-1 flex justify-center items-center pb-7 sm:pb-8 pt-8 border-b-2 sm:border-b-0 sm:border-r-2 border-neutral-700/20">
                      <img :src="getImage('weather-icon',w.now.Weather.value.icon+'.png')" class="w-24 sm:w-28 md:40 lg:w-44 opacity-60">
                      <div class="ml-8 text-left">
                        <h1 class="text-5xl md:text-6xl lg:text-7xl">
                          {{ w.now.Temperature.value.C }}&deg;
                        </h1>
                        <p class="text-xs md:text-sm font-semibold">
                          {{ w.now.Weather.value.description }}
                        </p>
                        <div class="flex items-center mt-4">
                          <img :src="getImage('weather-icon','farenheit.png')" class="w-4 h-4 opacity-60">
                          <p class="ml-1 text-xs md:text-sm">
                            {{ w.now.Temperature.value.F }}&deg;
                          </p>
                          <img :src="getImage('weather-icon','humidity.png')" class="w-4 h-4 ml-3 opacity-60">
                          <p class="ml-1 text-xs md:text-sm">
                            {{ w.now.Humidity.value }}
                          </p>
                          <img :src="getImage('weather-icon','wind-speed.png')" class="w-4 h-4 ml-3 opacity-60">
                          <p class="ml-1 text-xs md:text-sm">
                            {{ w.now['Wind speed'].value.Kt }} Knot
                          </p>
                        </div>
                      </div>
                  </div>

                  <div class="grid grid-cols-2 grid-rows-2 gap-4 pb-7 sm:pb-8 pt-7 sm:pt-8 md:px-6">
                      <div>
                        <h1 class="text-md md:text-xl font-medium">
                          {{ w.now['Max temperature'].value.C }}&#8451; / {{ w.now['Max temperature'].value.F }}&#8457;
                        </h1>
                        <p class="text-xs md:text-sm opacity-70">
                          Max. temperature
                        </p>
                      </div>
                      <div>
                        <h1 class="text-md md:text-xl font-medium">
                          {{ w.now['Min temperature'].value.C }}&#8451; / {{ w.now['Min temperature'].value.F }}&#8457;
                        </h1>
                        <p class="text-xs md:text-sm opacity-70">
                          Min. temperature
                        </p>
                      </div>
                      <div>
                        <h1 class="flex justify-center items-center text-md md:text-xl font-medium">
                          <img :src="getImage('weather-icon','arrow-1.png')" class="w-4 ml-3 opacity-60">
                          {{ w.now['Max humidity'].value }}
                          <img :src="getImage('weather-icon','arrow-1.png')" class="w-4 ml-3 opacity-60 rotate-180">
                          {{ w.now['Min humidity'].value }}
                        </h1>
                        <p class="text-xs md:text-sm opacity-70">
                          Humidity
                        </p>
                      </div>
                      <div>
                        <h1 class="text-md md:text-xl font-medium capitalize">
                          {{ w.now['Wind direction'].value.CARD }}
                        </h1>
                        <p class="text-xs md:text-sm opacity-70">
                          Wind Direction
                        </p>
                      </div>
                  </div>
              </div>

              <!-- weather three days ahead -->
              <div id="three_days_ahead" class="w-full h-0 bg-neutral-200/50 sm:mt-6 rounded overflow-hidden duration-300">
                <div class="w-full h-full flex items-center overflow-auto">

                  <template v-for="i in [0,1,2,3,4,5,6,7,8,9,10,11]" :key="i">
                    <div class="min-w-max flex-1 px-8 py-8 opacity-80">
                        <div class="flex justify-center items-center">
                          <img :src="getImage('weather-icon',w.three_days_ahead.Weather[i].value.icon+'.png')" class="h-14 opacity-60">
                          <h1 class="ml-4 text-4xl">
                            {{ w.three_days_ahead.Temperature[i].value.C }}&deg;
                          </h1>
                        </div>

                        <div class="mt-4 text-center">
                          <div class="flex items-center">
                            <img :src="getImage('weather-icon','farenheit.png')" class="w-4 h-4 opacity-60">
                            <p class="ml-1 text-xs">
                              {{ w.three_days_ahead.Temperature[i].value.F }}&deg;
                            </p>
                            <img :src="getImage('weather-icon','humidity.png')" class="w-4 h-4 ml-3 opacity-60">
                            <p class="ml-1 text-xs">
                              {{ w.three_days_ahead.Humidity[i].value }}
                            </p>
                            <img :src="getImage('weather-icon','wind-speed.png')" class="w-4 h-4 ml-3 opacity-60">
                            <p class="ml-1 text-xs">
                              {{ w.three_days_ahead['Wind speed'][i].value.Kt }} Knot
                            </p>
                          </div>
                          <p class="text-xs mt-2 font-semibold">
                            {{ w.three_days_ahead.Weather[i].value.description }}
                          </p>
                          <p class="text-xs mt-2">
                            {{ createDate(w.three_days_ahead.Temperature[i].timestamp) }}
                          </p>
                        </div>
                    </div>
                  </template>

                </div>
              </div>

          </div>

        </div>

        <!-- footer -->
        <footer class="sticky bottom-0 z-20 w-full pt-20 pb-6 text-center text-neutral-200 bg-gradient-to-b from-cyan-500/0 to-cyan-500">
          
        </footer>
    </section>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkedAlt,faAngleDown }  from '@fortawesome/free-solid-svg-icons'
import formSelectRegion    from '@/components/FormSelectRegion.vue'
import { useStore }        from 'vuex'
import { getLocalStorage } from '@/services/localstorage.service'

export default {
  name: 'HomeView',
  components: {
    FontAwesomeIcon,
    formSelectRegion,
  },
  methods: {
      toggleCardOnClick(event) {
        event.target.parentElement.classList.toggle('rotate-180');
        event.target.parentElement.parentElement.querySelector('#three_days_ahead').classList.toggle('h-0');
        event.target.parentElement.parentElement.querySelector('#three_days_ahead').classList.toggle('h-56');
      }
  },
  setup() {
    const store = useStore();

    const showSelectRegion = () => {
      store.commit("formSelectRegion/SET_SHOW_FORM",true);
    }

    const provinceVal = computed(() => {
        if (store.state.formSelectRegion.selectedProvince != null) {
            return store.state.formSelectRegion.selectedProvince;
        }

        return getLocalStorage('userdata') ? getLocalStorage('userdata').province : null; 
    });

    const cityVal = computed(() => {
        if (store.state.formSelectRegion.selectedCity != null) {
            return store.state.formSelectRegion.selectedCity;
        }

        return getLocalStorage('userdata') ? getLocalStorage('userdata').city : null; 
    });

    const userRegion = computed(() => {
      if (provinceVal.value && cityVal.value) {
        return {
          province: provinceVal.value,
          city    : cityVal.value,
          country : 'indonesia'}
      }
      else {
        store.commit("formSelectRegion/SET_SHOW_FORM",true);
        return "(choose region first)"
      }
    });

    const showWeatherSkeleton = computed(() => {
      return store.state.weather.showSkeleton;
    })

    const showWeather404 = computed(() => {
      return store.state.weather.show404;
    })

    const weatherDistrict = computed(() => {
      return store.state.weather.weatherDistrict;
    })

    // const getItude = () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(getWeatherByTitude);
    //   } 
    // }

    // const getWeatherByTitude = (position) => {
    //   console.log("titude",position.coords.latitude);
    //   console.log("longtitude",position.coords.longitude);
    // }

    const dateNow = () => {
      let date   = new Date(new Date().getTime());
      let numDay = date.toLocaleString("en-US",{day: "2-digit",timeZone: 'Asia/Jakarta'}); // id-ID
      let strDay = date.toLocaleString("en-US", {weekday: 'long',timeZone: 'Asia/Jakarta'});
      let month  = date.toLocaleString("en-US", {month: 'long',timeZone: 'Asia/Jakarta'});
      let time   = date.toLocaleString("en-US", {hour: '2-digit',minute: '2-digit',timeZone: 'Asia/Jakarta'});

      return{
        numDay,
        strDay,
        month,
        time,
      }
    }

    const createDate = (createdAt) => {
      let date   = new Date(new Date(createdAt).getTime());
      let strDay = date.toLocaleString("id-ID", {weekday: 'long',timeZone: 'Asia/Jakarta'});
      let time   = createdAt.split(' ')[1];

      return `${strDay}, ${time}`
    }

    const getImage = (path,name) => {
      return require(`@/assets/images/${path ? path+'/' : path}${name}`);
    }

    onMounted(() => {
      store.dispatch("formSelectRegion/GET_PROVINCE");

      if (getLocalStorage('userdata')) {
        store.dispatch("formSelectRegion/GET_CITY",getLocalStorage('userdata').provinceId);
      }

      if (provinceVal.value && cityVal.value) {
        store.dispatch("weather/GET_WEATHER_DISTRICT",{
          province: provinceVal.value,
          city    : cityVal.value,
        });
      }

      if(!navigator.onLine){
          store.commit("alert/SET_DATA_ALERT",{
            show :true,
            type :'warning',
            text :'<b>Ups, connection lost!</b> Please check your connection.'}
          );
      }
      window.onoffline = () => {
          store.commit("alert/SET_DATA_ALERT",{
            show :true,
            type :'warning',
            text :'<b>Ups, connection lost!</b> Please check your connection.'}
          );
      };
      window.ononline = () => {
          store.commit("alert/SET_DATA_ALERT",{
            show :false,
            type :'',
            text :''}
          );
      };
    })
    
    return {
      faMapMarkedAlt,faAngleDown,
      showSelectRegion,
      userRegion,
      showWeatherSkeleton,
      showWeather404,
      weatherDistrict,
      dateNow,
      createDate,
      getImage,
    }
  }
}
</script>
