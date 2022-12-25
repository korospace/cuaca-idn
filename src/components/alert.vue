<template>
    <transition name="slide" appear>
        <div
          v-if="showAlert"
          class="absolute z-50 left-6 right-0 bottom-6 pr-6 flex justify-start">
            <div
              class="w-full max-w-md rounded-lg text-neutral-700/80 flex justify-between sm:items-center"
              :class="{'bg-red-500':alertType=='danger','bg-green-500':alertType=='success','bg-yellow-500':alertType=='warning','bg-blue-500':alertType=='info'}">
                <span class="px-5 py-3 text-sm" v-html="alertMessage"></span>
                <span class="px-3 py-3 cursor-pointer" @click="closeAlert">
                    <font-awesome-icon
                      :icon="faTimes"
                      class="text-white text-lg"/>
                </span>
            </div>
        </div>
    </transition>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore }        from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes }         from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
    name: "AlertComponent",
    components: {
        FontAwesomeIcon
    },
    setup() {
        const store = useStore();

        const showAlert = computed(() => {
            return store.state.alert.data.show;
        });

        const alertType = computed(() => {
            return store.state.alert.data.type;
        });

        const alertMessage = computed(() => {
            return store.state.alert.data.text;
        });

        const closeAlert = () => {
            store.commit('alert/SET_DATA_ALERT',{show:false,type:'',text:``});
        }

        return{
            showAlert,
            alertType,
            alertMessage,
            faTimes,
            closeAlert
        }
    },
})
</script>

<style scoped>
    .slide-enter-active{
        animation: slide 0.8s;
    }
    .slide-leave-active{
        animation: slide 0.8s reverse;
    }
    @keyframes slide {
        0% {
            opacity: 0;
            transform: translateY(14px);
        }
        100% {
            opacity: 1;
            transform: translateY(-0px);
        }
    }
</style>