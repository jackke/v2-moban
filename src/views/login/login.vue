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
                <el-form-item  prop="username" style="box-sizing: border-box;">
                    <el-input v-model="form.account" placeholder="请输入账户"><i slot="prefix" style="font-size: x-large;color: #303133;" class="el-input__icon el-icon-user"></i></el-input>
                </el-form-item>
                <el-form-item  prop="password" style="margin-top: 40px;">
                    <el-input  placeholder="请输入密码" v-model="form.password" show-password><i slot="prefix" style="font-size: x-large;color: #303133;" class="el-input__icon el-icon-lock"></i></el-input>
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
                account: 'zhangke',
                password: '123456'
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
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
                        username: this.form.account,
                        password: this.form.password,
                        token: null,
                        // password: (CryptoJS.MD5(this.form.password).toString()).toUpperCase()
                    }
                    this.$http.post(`${this.$api.api}/user/login`, data).then(res => {
                        // console.log(res);
                        if (res.code == 200){
                            this.$store.commit('setUser', {...res.data})
                            this.$store.commit('setToken', res.data.token)
                            this.$router.push('/index')
                            // console.log(this.$store.state, '$store');
                        } else {
                            this.$message.error(res.message)
                        }
                    }).catch((error) => {
                        this.$message.error(error)
                    })
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
    height: 50px;
    font-size: 16px;
}
.title{
    display: inline-block;
    padding: 10px 0;
    font-size: 26px;
    margin-top: 40px;
    border-bottom: 3px solid #409EFF;
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
    left: 54.5%
}
.form-login /deep/ .el-input--prefix .el-input__inner {
    padding-left: 36px;
}
.login-button{
    height: 50px;
    line-height: 50px;
    margin-top: 40px;
    border-radius: 40px;
    overflow: hidden;
}
.el-form-item__content > button{
    height: 50px;
    width: 100%;
    font-size: 20px;
}
</style>