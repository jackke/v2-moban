<template>
    <div class="login-box">
        <!-- <div class="main">
            <div class="stars"></div>
        </div> -->
        <div class="form-login">
            <div>
                <span class="title">账户登录</span>
            </div>
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item  prop="username" >
                    <el-input  v-model="form.username" placeholder="请输入账户"></el-input>
                </el-form-item>
                <el-form-item  prop="password" style="margin-top: 40px;">
                    <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                </el-form-item>
                <el-form-item class="login-button">
                    <el-button type="primary" @click="onSubmit">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'; 
import store from "@/store";
import qs from "qs";

    export default {
      name: 'login',
      data() {
        return {
            form:{
                username: '13123456789',
                password: '123456'
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
            }
        }
      },
      created(){},
      mounted(){},
      methods: {
        onSubmit(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let data = {
                        username: this.form.username,
                        password: (CryptoJS.MD5(this.form.password).toString()).toUpperCase()
                    }
                    sessionStorage.setItem('token', '123')
                    this.$router.replace({path:'/index'})
                    // login(data).then(res => {
                    // this.$http.post(`${this.$api.server}/auth/login`, qs.stringify(data)).then(res => {
                    //     if (res.code == 0){
                    //         this.$store.commit('setToken', res.data.token)
                    //         this.$store.commit('setUser', {id: '', username: res.data.username})
                    //         this.$router.replace({path:'/index'})
                    //         // console.log(this.$store.state, '$store');
                    //     } else {
                    //         this.$message.error(res.data.msg)
                    //     }
                    // }).catch((error) => {
                    //     this.$message.error(error)
                    // })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
      }
  }
</script>
<style scoped>
.login-box{
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/login/login-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    
}
:deep .el-input__inner {
    height: 60px;
    font-size: 24px;
}
.title{
    display: inline-block;
    padding: 10px 0;
    font-size: 30px;
    margin-top: 40px;
    /* border-bottom: 3px solid #409EFF; */
    margin-bottom: 40px;
}
.form-login{
    width: 30%;
    min-height: 50%;
    padding: 10px 30px 10px 30px;
    border-radius: 10px;
    background: rgba(255,255,255,1);
    position: fixed;
    top: 23%;
    left: 54%;
}
.login-button{
    height: 60px;
    margin-top: 40px;
    border-radius: 40px;
    overflow: hidden;
}
.el-form-item__content > button{
    height: 60px;
    width: 100%;
    font-size: 20px;
}
</style>