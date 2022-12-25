import axios     from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state: {
      show: false,
      showCitySkeleton: false,
      province: [],
      city    : [],
      selectedProvinceId : null,
      selectedProvince   : null,
      selectedCity       : null,
    },
    getters: {
        provinceGetter: state => state.province
    },
    actions: {
        GET_PROVINCE: function ({ rootState,commit }) {

            axios
                .get(`${rootState.apiurl}/api/v1/province`)
                .then(( res ) => {
                
                    commit("SET_PROVINCE",res.data);
                
                })
                .catch(( ) => {
                    
                    toast.error("something wrong, refresh page!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                })

        },
        GET_CITY: function ({ rootState,commit },id) {

            // show loading
            commit("SET_SHOW_CITY_SKELETON",true);

            axios
                .get(`${rootState.apiurl}/api/v1/city?provId=`+id)
                .then(( res ) => {
                
                    commit("SET_CITY",res.data);
                
                })
                .catch(( ) => {
                    
                    toast.error("something wrong, refresh page!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                })
                .finally(() => {

                    commit("SET_SHOW_CITY_SKELETON",false);

                })

        },
    },
    mutations: {
        SET_SHOW_FORM: function(state, show) {
            state.show = show;
        },
        SET_SHOW_CITY_SKELETON: function(state, data) {
            state.showCitySkeleton = data;
        },
        SET_PROVINCE: function(state, data) {
            state.province = data;
        },
        SET_CITY: function(state, data) {
            state.city = data;
        },
        SET_SELECTED_PROVINCEID: function(state, data) {
            state.selectedProvinceId = data;
        },
        SET_SELECTED_PROVINCE: function(state, data) {
            state.selectedProvince = data;
        },
        SET_SELECTED_CITY: function(state, data) {
            state.selectedCity = data;
        },
    }
}