<template>
    <div class="header-box">
        <div class="title">
            值班系统
        </div>
        <div class="menu-list flex">
             <div @click="navRouter('dutyManage')">值班列表</div>
             <div @click="navRouter('dutyInfo')">值班信息</div>
             <div @click="navRouter('userDuty')">我的值班</div>
             <div @click="navRouter('userManage')">人员管理</div>
        </div>
        <div  class="nav nav-right">
            <!-- <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{ userName }} <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
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
    background-color: #409EFF;
    padding: 0 20px;

    // background-image: url(../../../public/image/head-bg.png);
    // background-size: 100% 120%;
    // border-bottom: 1px solid #E5E7EB;



   .menu-list{
        color: #fff;
        display: flex;
        // font-size: 15px;
        // margin-top: 30px;
        >div{
            cursor: pointer;
            margin-left: 20px;
            // background-image: url(../../../public/image/nav-bg.png);
            // background-size: 100% 100%;
        }
    }


//     >div{
//         flex: 1;
//         text-align: center;
//     }
//    .title{
//         font-size: 2rem;
//         font-weight: 500;
//         color: #fff;
//         background: linear-gradient(0deg, rgba(5,63,152,0.5) 0%, #FFFFFF 20%, #FFFFFF 100%);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//     }
//     .nav{
//         color: #fff;
//         display: flex;
//         font-size: 15px;
//         margin-top: 30px;
//         >div{
//             cursor: pointer;
//             background-image: url(../../../public/image/nav-bg.png);
//             background-size: 100% 100%;
//             padding:5px 20px;
//             border-radius: 5px;
//         }
//         >div.active{
//             background-image: url(../../../public/image/nav-action.png);
//             background-size: 100% 130%;
//         }
//     }
//     .nav-left{
//         justify-content: flex-end;
//         margin-right: 100px;
//         >div{
//             margin-right: 20px;
//         }
//     }
//     .nav-right{
//         justify-content: flex-start;
//         margin-left: 100px;
//         >div{
//             margin-left: 20px;
//         }
//     }
}

</style>