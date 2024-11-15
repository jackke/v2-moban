<template>
    <div class="header-box">
        <div class="title">
            智能网格管理系统
        </div>
        <div class="menu-list flex">
             <div @click="navRouter('productManage')" :class="activeIndex == 'productManage' ? 'active' : ''">产品制作</div>
             <!-- <div @click="navRouter('dutyInfo')" :class="activeIndex == 'dutyInfo' ? 'active' : ''">值班信息</div>
             <div @click="navRouter('userDuty')" :class="activeIndex == 'userDuty' ? 'active' : ''">我的值班</div>
             <div @click="navRouter('userManage')" :class="activeIndex == 'userManage' ? 'active' : ''">人员管理</div> -->
        </div>
        <div  class="nav nav-right">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <img src="../../../public/image/touxiang.jpg" alt="" style="width: 30px; margin-right: 5px;">  {{ userName }} <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'headMenu',
      data() {
        return {
            routerName: '',
            menuRoute: {},
            activeIndex: "dutyManage",
            userName: "admin",
        }
      },
      watch:{ },
      created(){
        this.routerName = this.$route.name //获取路由名称
      },
      mounted(){},
      methods: {
        // 跳转页面
        navRouter(value){
            this.activeIndex = value;
            this.$router.push(`/${value}`)
            this.routerName = value
        }
      }
  }
</script>
<style lang="scss" scoped>
.header-box{
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    // background-color: #165DFF;
    padding: 0 20px;
    background-image: url(./image/head-blue.png);
    background-size: 100% 100%;
    // border-bottom: 1px solid #E5E7EB;
    .title{
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-size: 32px;
        color: #F7FBFF;
    }


   .menu-list{
        display: flex;
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-size: 16px;
        color: #F7FBFF;
        // margin-top: 30px;
        >div{
            cursor: pointer;
            padding: 10px 40px;
            margin-left: 20px;
            background-image: url(../../../public/image/nav-bg.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position-y: 8px;
            opacity: 0.9;

        }
        >div.active{
            background-image: url(../../../public/image/nav-action.png);
            background-size: 100% 100%;
        }
    }
    .el-dropdown{
        color:#fff
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
}

</style>