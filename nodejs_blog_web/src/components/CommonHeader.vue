<template>
  <header>
    <div class="wrapper">
      <el-row>
        <el-col :span="4">
          <div class="logo">个人博客</div>
        </el-col>
        <el-col :span="20">
          <el-menu mode="horizontal" class="nav" :default-active="$route.path" background-color="#2d2d2d" text-color="#9d9d9d" active-text-color="#fff">
            <el-menu-item index="/">
              <router-link to="/"><i class="iconfont icon-home"></i>首页</router-link>
            </el-menu-item>
            <el-menu-item index="/article" v-if="isSigIn === 1">
              <router-link to="/article">我的博客</router-link>
            </el-menu-item>
            <el-menu-item index="/login" v-if="isSigIn === 0">
              <router-link to="/login" class="signBtn">登录</router-link>
            </el-menu-item>
            <el-menu-item index="/personal" v-else-if="isSigIn === 1">
              <router-link to="/personal" class="signBtn signBtn_bgc">
                <img class="head_img" :src="head_img" alt="">
                {{userName}}
              </router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>

    </div>
  </header>
</template>

<script>
  export default {
    name: "CommonHeader",
    data () {
      return {
        userName: '',
        head_img: ''
      }
    },

    methods: {
      getUserInfo () {
        return this.$axios.get('api/users/info').then((res) => {
          console.log(res)
          if (res.code === 0) {
            this.userName = res.data.nickname
            this.head_img = res.data.head_img
          } else {
            this.$message({
              msg: res.data.msg,
              type: 'error'
            })
          }
        })
      }
    },

    computed: {
      isSigIn () {
        return this.$store.state.isSignIn
      },
    },

    created () {
      this.getUserInfo()
    }
  }


</script>

<style lang="scss" scoped>
  header {
    // position: fixed;
    // width: 100%;
    // top: 0;
    // left: 0;
    background-color: #2d2d2d;
    color: #9d9d9d;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
    .logo {
      line-height: 60px;
      font-size: 18px;
    }
    .nav {
      float: right;
      border-bottom: none;
      li {
        padding: 0;
        a {
          display: inline-block;
          padding: 0 20px;
          .iconfont {
            vertical-align: top;
            margin: 0 5px 0 0;
          }
        }
      }
    }
  }
  .signBtn {
    background: #3b99fc !important;
    color: #fff !important;
    line-height: 60px;
  }
  .signBtn_bgc {
    background-color: #2d2d2d !important;
    line-height: 50px !important;
  }
  .head_img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #eee;
    margin-right: 5px;
    box-sizing: border-box;
  }
</style>