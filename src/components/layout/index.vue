<template>
    <div class="home-box app-main">
        <el-container>
          <el-header style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); height:4rem;">
              <headMenu></headMenu>
          </el-header>
          <el-container>
            <el-aside width="200px">
                <leftMenu></leftMenu>
            </el-aside>
            <el-container>
                <el-main style="padding: 0;">
                    <router-view></router-view>
                </el-main>
            </el-container>
          </el-container>
        </el-container>
    </div>
</template>

<script>
import routes from '@/router/routes'
// import headMenu from '@/components/header/header.vue'
import headMenu from '@/components/headerMenu/headerMenu.vue'
import leftMenu from '@/components/leftMenu/index.vue'
    export default {
      name: 'layout',
      components:{headMenu, leftMenu},
      data() {
        return {
            form:{
                username: '13123456789',
                password: '123456'
            },
            userName: '',
        }
      },
      
      watch:{
        $route(to, from){
          this.initData()
        }
      },
      created(){
        this.initData()
      },
      mounted(){},
      methods: {
        initData(){
         
        },
        // 退出
        logout(){
          this.$confirm('是否确认退出？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(res => {
            let params = {
              username: this.$store.state.user.name
            }
            // this.$http.post(`${this.$api.api}/user/exit`, params).then(res => {
            //     if (res.code == 200){
            //       this.$store.commit('setUser', {id: '', name: '', token: '', auth: ''})
            //       this.$store.commit('setToken', '')
            //       localStorage.clear()
            //       sessionStorage.clear()
            //       this.$router.replace('/login')
            //     } else {
            //         this.$message.error(res.message)
            //     }
            // }).catch((error) => {
            //     this.$message.error(error)
            // })
          }).catch(err => {})
          
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
/deep/ .el-header{
  padding: 0;
}
/deep/ .el-main{
  height: calc(100vh - 4rem);
  overflow: auto;
}
/deep/ .el-aside{
  background: url(../../../public/image/menu-bg.png);
  background-repeat: no-repeat;
  background-position:bottom;
}

</style>