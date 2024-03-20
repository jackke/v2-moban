<template>
    <div class="home-box">
      <!-- 头 部 -->
        <div class="head">
          <div class="title">
            天腾数据管理系统 
            <i class="el-icon-s-fold" @click="isCollapse = true" v-if="!isCollapse && menuRoute.menuDisabled"></i>
            <i class="el-icon-s-unfold" @click="isCollapse = false" v-if="isCollapse && menuRoute.menuDisabled"></i>
          </div>
          <div style="flex:1; display: flex; justify-content: center;">
            <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="home" @click="routePath('/home')">首页</el-menu-item>
                <el-menu-item index="dataManage">数据管理</el-menu-item>
                <el-menu-item index="dataMonitor">数据监控</el-menu-item>
                <el-menu-item index="systemAllocation">系统配置</el-menu-item>
              </el-menu>
            </div>
          </div>
          <div class="dropdown">
            <el-dropdown style="margin-top: 20px;" @command="logout">
              <span class="el-dropdown-link">
                <i class="el-icon-s-custom"></i>
                {{ userName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-container style="flex: 1; position: relative; z-index: 10;">
          <!-- 侧导航 -->
            <el-menu :default-active="defaultActive" ref="conMenu" class="mars-menu-vertical" :style="`margin-left:${menuRoute.menuDisabled ? '0' : '-250px'}`" :unique-opened="true" @select="onMenuSelect" :collapse="isCollapse">
                <template v-for="(item, index) in menuRoute.children">
                  <template v-if="item.children">
                    <el-submenu :index="item.idIndex"  :key="index">
                      <template slot="title" >
                          <i :class="'iconfont ' + item.icon"></i>
                          <span slot="title">{{ item.name }}</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item :index="it.idIndex" v-for="(it, j) in item.children" :key="j" @click="menuRoutePath(it.path, it.idIndex)">{{ it.name }}</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                  </template>
                  <el-menu-item v-else :index="item.idIndex" :key="index + 'menu'" @click="menuRoutePath(item.path, item.idIndex)">
                    <i :class="'iconfont ' + item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                  </el-menu-item>
                </template>
            </el-menu>
           <!-- 中间内容 -->
          <el-main class="main-box">
                    <router-view></router-view>
          </el-main>
        </el-container>
    </div>
</template>

<script>
import routes from '@/router/routes'

    export default {
      name: 'layout',
      components:{},
      data() {
        return {
            asideWidth: 0,
            menuRoute: {},
            activeIndex: "home",
            defaultActive: '1',
            isCollapse: false, // 侧导航是否收起
            form:{
                username: '13123456789',
                password: '123456'
            },
            userName: '',
            mapBlock: true,
            
        }
      },
      
      watch:{
        $route(to, from){
          if (to.path == '/index' || to.path == '/'){
            this.$router.push('/home')
          }
          // 高亮侧边栏菜单， 调度配置页面
          if (to.path == '/dispatchLog'){
            this.$refs.conMenu.activeIndex = '5-2'
          }

          this.initData()
        }
      },
      created(){
        if (this.$route.path == '/index' || this.$route.path == '/'){
            this.routePath('/home')
        }
        this.initData()
       
      },
      mounted(){},
      methods: {
        initData(){
          this.userName = this.$store.state.user.username || ''
          this.activeIndex = sessionStorage.getItem('activeIndex') || 'home' //保存一级菜单高亮
          this.menuRoute = routes[this.activeIndex] || [] // 初始化数据
          this.defaultActive = sessionStorage.getItem('defaultActive') || '1' //保存二级菜单高亮
        },
        handleSelect(value){
            this.$refs.conMenu.activeIndex = '1'
            this.menuRoute = routes[value] || {}
            sessionStorage.setItem('activeIndex', value)
        },
        onMenuSelect(key, keyPath){
           
        },
        routePath(value){
          this.$router.push(value)
        },
        menuRoutePath(value, key){
            sessionStorage.setItem('defaultActive', key || '1')
            this.$router.push(value)
        },
        mapReady(){

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
  .head{
    padding:0 20px;
    display: flex;
    border-bottom: 1px solid #dcdfe6;
    font-size: 20px;
    .title{
      width: 260px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      i{
        font-size: 26px;
        margin-left: 10px;
        color: #606266;
      }
    }
    .el-menu.el-menu--horizontal{
      border-bottom: 0;
    }
  }
  .main-box{
    background-color: #F2F4F9;
    padding: 0;
  }
  .dropdown{
    padding-left: 20px;
  }
  .mars-menu-vertical{
    text-align: left;
    // transition: all 0.3s;
    position: relative;
    z-index: inherit;
    i.iconfont{
      margin-right: 10px;
    }
    
  }
  .mars-menu-vertical:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
  .map-view{
    width: 100vw;
    height: 100%;
  }
  /deep/ .el-menu{
    border-right: 0;
  }
  /deep/ .el-menu-item-group__title{
    display: none;
  }
  /deep/ .el-menu.el-menu--inline{
    background-color: #DEE5F3;
  }
  /deep/ .is-active{
    background-color:#F2F4F9;
  }
  /deep/ .is-opened{
    background-color: #fff;
  }
}

</style>