import { createStore }  from 'vuex'
import loading          from './modules/loading'
import alert            from './modules/alert'
import formSelectRegion from './modules/formSelectRegion'
import weather          from './modules/weather'

export default createStore({
  state: {
    // apiurl: "http://127.0.0.1:3000",
    apiurl: "https://api-cuaca-indo.up.railway.app",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loading,
    alert,
    formSelectRegion,
    weather,
  }
})
