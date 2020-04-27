<template>
  <header>
    <div class="wrapper">
      <el-row>
        <el-col :span="4">
          <div class="logo">个人博客</div>
        </el-col>
        <el-col :span="20">
          <el-menu mode="horizontal" class="nav" :default-active="activeIndex" @select="hanleSelect" background-color="#2d2d2d" text-color="#9d9d9d" active-text-color="#fff">
            <el-menu-item index="1">
              <router-link to="/"><i class="iconfont icon-home"></i>首页</router-link>
            </el-menu-item>
            <el-menu-item index="2" v-if="isSigIn === 1">
              <router-link to="/article">我的博客</router-link>
            </el-menu-item>
            <el-menu-item index="3" v-if="isSigIn === 0">
              <router-link to="/login" class="signBtn">登录</router-link>
            </el-menu-item>
            <el-menu-item index="3" v-else-if="isSigIn === 1">
              <router-link to="/personal" class="signBtn">用户名</router-link>
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
        activeIndex: '1'
      }
    },

    methods: {
      hanleSelect (index) {
        this.activeIndex = index
      }
    },

    computed: {
      isSigIn () {
        return this.$store.state.isSignIn
      }
    }
  }


</script>

<style lang="scss" scoped>
  header {
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
</style>