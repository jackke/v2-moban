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
    height: 100vh;
    // background-color: #F2F6FC;
    box-sizing: border-box;
    background-image: url(../public/image/bg.png);
    background-size: 100% 100%;
  }
</style>