<template>
    <div class="home-box app-main">
        <el-container>
          <el-header style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); height: 4rem;">
              <headMenu></headMenu>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
    </div>
</template>

<script>
import routes from '@/router/routes'
import headMenu from '@/components/header/header.vue'
    export default {
      name: 'layout',
      components:{headMenu},
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
  margin-bottom: 20px;
}
/deep/ .el-main{
  height: calc(100vh - 8rem);
  overflow: auto;
}

</style>