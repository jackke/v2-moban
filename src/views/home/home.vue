<template>
    <div class="home-box">
      <!-- 头 部 -->
        <div class="head">
          <div class="title">
            风光电站数据管理系统 
            <i class="el-icon-s-fold" @click="isCollapse = true" v-if="!isCollapse && menuData.length"></i>
            <i class="el-icon-s-unfold" @click="isCollapse = false" v-if="isCollapse && menuData.length"></i>
          </div>
          <div style="flex:1; display: flex; justify-content: center;">
            <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="home" @click="onHome">首页</el-menu-item>
                <el-menu-item index="dataManage" @click="onSubmit">数据管理</el-menu-item>
                <el-menu-item index="dataMonitor">数据监控</el-menu-item>
                <el-menu-item index="systemManage">系统管理</el-menu-item>
              </el-menu>
            </div>
          </div>
          <div class="dropdown">
            <el-dropdown style="margin-top: 20px;">
              <span class="el-dropdown-link">
                用户名<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-container style="flex: 1;">
          <!-- 侧导航 -->
            <el-menu default-active="2" class="mars-menu-vertical" :style="`display:${menuData.length ? 'block' : 'none'} ;`" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">分组一</span>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <span slot="title">选项4</span>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu> -->
              <el-menu-item :index="item.index" v-for="(item, index) in menuData" :key="index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
           <!-- 中间内容 -->
          <el-main class="main-box">
            <router-view></router-view>
          </el-main>
        </el-container>
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
    background-color: #F2F6FC;
  }
  .dropdown{
    padding-left: 20px;
  }
  .mars-menu-vertical{
    text-align: left;
    // transition: all 0.3s;
  }
  .mars-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
}

</style>