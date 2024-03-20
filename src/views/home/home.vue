<template>
    <div class="home-box">
      
    </div>
</template>

<script>
import menu from '@/router/menu'
    export default {
      name: 'home',
      data() {
        return {
            asideWidth: 0,
            menuData: [],
            activeIndex: "home",
            isCollapse: false, // 侧导航是否收起
            form:{
                username: '13123456789',
                password: '123456'
            },
            
        }
      },
      created(){
        let token = sessionStorage.getItem('token') || 0
        if (!token) this.$router.push('/login')
      },
      mounted(){},
      methods: {
        handleSelect(value){
          // // console.log(value);
          this.menuData = menu[value] || []
          // switch (value) {
          //   case 'home':
          //   this.asideWidth = 0
          //   this.menuData = menu[value] || []
          //     break;
          
          //   default:
          //   this.asideWidth = 200
          //     break;
          // }
        },
        onHome(){
        //  console.log(1231);
        },
        onSubmit(){
          
        },
        handleOpen(key, keyPath){

        },
        handleClose(key, keyPath){

        },
      }
  }
</script>
<style lang="scss" scoped>
.home-box{
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>