#### 初始化项目及vue前端框架搭建 
* 安装 vue
```js
npm install -g @vue/cli 
```
* 检查vue安装是否成功
```js
vue --version
```
* 创建项目 
```js
vue create project(项目名称，自定义)
```
#### 路由设计及公共布局实现 
* 安装 element-ui  
```js
npm i element-ui -s
```
* 在main.js中引入element-ui 
```js
import ElementUI from 'element-ui'
import 'element-ui/lib/them-chalk/index.css'

Vue.use(ElementUI)
```
* 公共路由涉及 
```js
const routes = [{
  path: '/',
  component: () => import('@/components/CommonLayout.vue')
}]
```
* 公共顶部 
```js
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
            <el-menu-item index="2">
              <router-link to="/">我的博客</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/" class="signBtn">登录</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>

    </div>
  </header>
```
* 公共底部 
```js
<footer>
    <div class="wrapper">
      Copyright © xxxx
    </div>
  </footer>
```
* 公共的布局组件中引入顶部和底部组件 
```js
<script>
import CommonHeader from '@/components/CommonHeader'
import CommonFooter from '@/components/CommonFooter'
export default {
  name: "CommonLayout",
  components: {
    CommonHeader,
    CommonFooter
  }
}
</script>
```
* list 组件  
```js
<template>
  <div class="list">
    <div class="card">
      <router-link :to="'/datails/' + 1">
        <p class="title">nodejs教程</p>
      </router-link>
      <p class="date">2020-03-23</p>
    </div>
  </div>
</template>
```
#### 博客系统详情页布局 
* 安装 mavon-editor 编辑器 
```js
npm install mavon-editor --save
```
* Main.js 中引入编辑器 
```js
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
```
* 编辑器设置 
```js
<mavon-editor v-model="content"
defaultOpen="preview"
:toolbarsFlag="false"
:subfield="false"></mavon-editor>
```

name名称|type类型|default默认值|describe描述
--|:--:|:--:|--
defaultOpen|String||edit:默认展开编辑区域，preview:默认展示预览区域,其他 = edit
toolbarsFlag|Boolean|true|工具栏是否显示
subfield|Boolean|true|true:双栏(编辑预览同屏),false:单栏(编辑预览分屏)
官方文档:https://www.npmjs.com/package/yj-mavoneditor


