@ -1,5 +1,5 @@
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data () {
    return {
     
    };
  },
  watch:{
    $route(to, from){
      // if (to.path == '/index' || to.path == '/') {
      //   this.dialogVisible = true
      // } else {
      //   this.dialogVisible = false
      // }
    }
  },
  components:{},
  created(){},
  mounted () {
   
  },
  methods: {

  }
}
</script>

<style lang="scss">
  #app {
    --font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
  }
</style>