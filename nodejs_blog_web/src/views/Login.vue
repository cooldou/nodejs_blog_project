<template>
  <div class="sign-box">
    <div class="signIn common-box" v-if="status === 1">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" key="login" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signBtn" type="primary" @click="signIn">登录</el-button>
        </el-form-item>
      </el-form>
      <span class="signText" @click="toSignUP">注册新账号</span>
    </div>
    <div v-else class="signUp common-box">
      <el-form :model="regForm" :rules="regRules" ref="regForm" label-width="80px" key="register">
        <el-form-item prop="username" label="账号">
          <el-input v-model="regForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="regForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="regForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="signBtn" type="primary" @click="signUP">注册</el-button>
        </el-form-item>
      </el-form>
      <span class="signText" @click="toLogin">直接登录</span>
    </div>
    <div v-loading.fullscreen.lock="loading"></div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Cookie from 'js-cookie'
  export default {
    name: "Login",
    data () {
      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else {
      //     if (this.regForm.checkPass !== '') {
      //       this.$refs.regForm.validateField('checkPass');
      //     }
      //     callback();
      //   }
      // };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.regForm.pass) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        loading: false,
        status: 1,
        loginForm: {
          username: '',
          password: ''
        },
        regForm: {
          username: '',
          password: '',
          nickname: ''
        },
        loginRules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        regRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      ...mapMutations('Base', ['setToken']),
      signIn () {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.post('api/users/login', this.loginForm).then(res => {
              console.log(res)
              if (res.code != 0) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
                this.loading = false
              } else {
                Cookie.set('token', res.token)
                // this.setToken(res.token) //分别使用不同的方法使用 vuex
                this.$store.commit('setToken', res.token)
                this.$store.commit('changIsSigin', 1) //分别使用不同的方法使用 vuex
                setTimeout(() => {
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                  this.$router.push({ name: 'home' })
                  this.loading = false
                }, 1500)
              }
            })
          } else {
            console.log('error submit!!');
            this.loading = false
            return false;
          }
        });
      },
      signUP () {
        this.$refs['regForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('api/users/register', this.regForm).then(res => {
              console.log(res)
              if (res.code != 0) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
                this.loading = false
              } else {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.loading = false
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toSignUP () {
        this.status = 2
      },
      toLogin () {
        this.status = 1
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sign-box {
    position: relative;
    height: 100%;
    width: 100%;
    .common-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      text-align: center;
    }
    .signBtn {
      width: 100%;
      font-size: 18px;
    }
    .signText {
      cursor: pointer;
      color: #3b78dd;
      &:hover {
        color: #1760d7;
      }
    }
  }
</style>