<template>  
  <LoadingComponent />
  <AlertComponent />
  <router-view/>
</template>

<script>
  import LoadingComponent from "@/components/loading.vue";
  import AlertComponent   from "@/components/alert.vue";

  export default {
    components: {
      LoadingComponent,
      AlertComponent,
    },
    setup() {
      
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
