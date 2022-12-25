<template>
    
    <transition name="fade">
        
        <!-- Container -->
        <div
          v-if="isShowForm"
          id="container_form"
          class="fixed z-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50">
            
            <transition name="slide" appear>
                
                <!-- Form -->
                <form
                  @submit.prevent="formOnSubmit"
                  class="w-full max-w-xs min-h-fit flex flex-col bg-neutral-100 rounded-lg shadow-md overflow-hidden">

                    <!-- header -->
                    <header
                     class="relative w-full py-4 text-center text-neutral-800 tracking-widest border-b border-neutral-400">
                        Choose Region
                    </header>

                    <!-- body -->
                    <main
                      class="flex-1 px-4 py-6">

                        <p class="w-full text-left text-neutral-500 text-sm font-semibold">province</p>

                        <select
                          name="province"
                          :value="provinceVal"
                          @change="provOnChange"
                          class="w-full z-10 mt-2 px-4 py-3 text-neutral-800 focus:outline-none bg-transparent border border-neutral-500 rounded">
                            <option value="">-- province --</option>
                            <option v-for="x in provinceList" :key="x" :value="x.nama" :provId="x.id">{{ x.nama }}</option>
                        </select>

                        <p class="w-full mt-6 text-left text-neutral-500 text-sm font-semibold">city</p>

                        <div
                          v-if="showCitySkeleton==true"
                          class="w-full h-12 mt-3 bg-neutral-500/80 animate-pulse rounded">
                        </div>

                        <select
                          v-if="showCitySkeleton==false"
                          name="city"
                          :value="cityVal"
                          @change="cityOnChange"
                          :class="{
                            'cursor-not-allowed':provinceVal==null || provinceVal==''
                          }"
                          class="w-full z-10 mt-3 px-4 py-3 text-neutral-800 focus:outline-none bg-transparent border border-neutral-500 rounded"
                          :disabled="provinceVal==null || provinceVal==''">
                            <option value="">-- city --</option>
                            <option v-for="x in cityList" :key="x" :value="x.nama">{{ x.nama }}</option>
                        </select>
                    
                    </main>

                    <!-- button -->
                    <footer
                      class="w-full flex items-center py-4 px-2 border-t border-neutral-400">

                        <button
                         class="w-1/2 py-3 font-bold text-center text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded">
                            save
                        </button>
                        <button
                         @click.prevent="closeForm"
                         class="w-1/2 text-neutral-700 hover:text-neutral-900 underline">
                            close
                        </button>

                    </footer>

                </form>

            </transition>

        </div>

    </transition>

</template>

<script>
import SelectRegionRules from '@/validations/SelectRegionRules'
import { useStore }      from 'vuex';
import { computed }      from '@vue/runtime-core';
import { toast }         from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getLocalStorage, saveLocalStorage } from '@/services/localstorage.service';

export default {
    name: "FormSelectRegion",
    components: {
    },
    setup(){
        const store = useStore();

        const isShowForm = computed(() => {
            return store.state.formSelectRegion.show;
        })

        const provinceList = computed(() => {
            return store.state.formSelectRegion.province;
        });

        const cityList = computed(() => {
            return store.state.formSelectRegion.city;
        });

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

        const showCitySkeleton = computed(() => {
            return store.state.formSelectRegion.showCitySkeleton;
        })

        const provOnChange = (e) => {
            let provId   = e.target.options[e.target.options.selectedIndex].getAttribute('provId');
            let provName = e.target.value;
            
            store.commit("formSelectRegion/SET_SELECTED_PROVINCEID",provId);
            store.commit("formSelectRegion/SET_SELECTED_PROVINCE",provName);
            store.commit("formSelectRegion/SET_SELECTED_CITY","");
            store.dispatch("formSelectRegion/GET_CITY",provId);
        }

        const cityOnChange = (e) => {
            store.commit("formSelectRegion/SET_SELECTED_CITY",e.target.value);
        }

        const closeForm = () => {
            if (provinceVal.value && cityVal.value) {
                store.commit("formSelectRegion/SET_SHOW_FORM",false);

                if (store.state.weather.weatherDistrict.length <= 0) {
                    store.commit("formSelectRegion/SET_SELECTED_PROVINCEID",null);
                    store.commit("formSelectRegion/SET_SELECTED_PROVINCE",null);
                    store.commit("formSelectRegion/SET_SELECTED_CITY",null);
                    closeForm();
                }
            } 
            else {
                toast.warning("please, select your region!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } 
        }

        const formOnSubmit = () => {
            if (provinceVal.value && cityVal.value) {
                store.commit("formSelectRegion/SET_SHOW_FORM",false);
                store.dispatch("weather/GET_WEATHER_DISTRICT");
                saveLocalStorage('userdata',{
                    provinceId:store.state.formSelectRegion.selectedProvinceId,
                    province:provinceVal.value,
                    city:cityVal.value,
                })

                return false;
            }
            
            toast.warning("please, select your region!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

        return {
            SelectRegionRules,
            isShowForm,
            closeForm,
            provinceList,
            cityList,
            provinceVal,
            cityVal,
            showCitySkeleton,
            provOnChange,
            cityOnChange,
            formOnSubmit,
        }
    }
}
</script>

<style scoped>
    .fade-enter-active{
        animation: fade .4s;
    }
    .fade-leave-active{
        animation: fade .2s reverse;
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .slide-enter-active{
        animation: slide-in .4s;
    }
    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateY(-20px)
        }
        100% {
            opacity: 1;
            transform: translateY(0px)
        }
    }
</style>