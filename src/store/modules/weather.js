import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
        show404: false,
        showSkeleton: false,
        weatherDistrict: [],
    },
    getters: {
    },
    actions: {
        GET_WEATHER_DISTRICT: function ({ rootState,commit },data = null) {
            commit("SET_SHOW_404",false);
            commit("SET_SHOW_SKELETON",true);
            commit("SET_WEATHER_DISTRICT",[]);

            let province = data ? data.province : rootState.formSelectRegion.selectedProvince;
            let city     = data ? data.city     : rootState.formSelectRegion.selectedCity;

            axios
                .get(`${rootState.apiurl}/api/v1/weather?province=${province}&city=${city}`)
                .then(( res ) => {
                
                    commit("SET_WEATHER_DISTRICT",res.data.district);
                
                })
                .catch(( err ) => {
                    
                    if (err.response.status == 404) {
                        commit("SET_SHOW_404",true);
                    }
                    else if (err.response.status >= 500) {
                        toast.error("something wrong, refresh page!", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }

                })
                .finally(() => {
                    commit("SET_SHOW_SKELETON",false);
                })

        },
    },
    mutations: {
        SET_SHOW_SKELETON: function(state, data) {
            state.showSkeleton = data;
        },
        SET_SHOW_404: function(state, data) {
            state.show404 = data;
        },
        SET_WEATHER_DISTRICT: function(state, data) {
            state.weatherDistrict = data;
        },
    }
}