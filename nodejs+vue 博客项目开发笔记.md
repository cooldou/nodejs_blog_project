#### 前端开发
##### 初始化项目及vue前端框架搭建 
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
##### 路由设计及公共布局实现 
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
##### 博客系统详情页布局 
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

| name名称     | type类型 | default默认值 | describe描述                                                |
|--------------|:--------:|:-------------:|-------------------------------------------------------------|
| defaultOpen  |  String  |               | edit:默认展开编辑区域，preview:默认展示预览区域,其他 = edit |
| toolbarsFlag | Boolean  |     true      | 工具栏是否显示                                              |
| subfield     | Boolean  |     true      | true:双栏(编辑预览同屏),false:单栏(编辑预览分屏)            |
官方文档:https://www.npmjs.com/package/yj-mavoneditor
#### 服务器开发 
通过应用程序生成器工具 express-generator 可以快速创建一个应用框架   
可以通过 npx (包含在 Node.js 8.2.0 及更高版本中) 命令来运行 Express 应用程序生成器
```js
npx express-generator 
```
对于较老的 Node 版本，请通过 npm 将 Express 应用程序生成器安装到全局环境中并执行即可。
```js
npm install -g express-generator
express
```
express -h 参数可以列出所有可用的命令行参数
##### 后台 mysql 数据库设计  
* 用户表设计 
  * 用户id
  * 用户账号
  * 用户密码
  * 用户昵称
  * 用户头像 
* 文章表设计  
  * 文章id
  * 文章标题 
  * 创建时间 
  * 文章内容 
  * 作者用户id
  * 删除状态 
* 评论表设计 
  * 评论id
  * 评论内容
  * 用户id
  * 文章id
  * 创建时间 
  * 用户头像
##### 注册接口开发 
* 处理跨域的中间件 
```js
npm install cros -s
```
app.js
```js
  const cors = require('cors')
  app.use(cors())
```
* md5 密码加密 
 * 安装 crypto
 ```js
 npm install crypto --save
 ```
 * 加密方法 
 ```js
 const crypto = require('crypto')

  function md5(s) {
    // 注意参数需要为 string 类型，否则会报错 
    return crypto.createHash('md5').update(String(s)).digest('hex')
  }

  module.exports = {
    md5
  }
 ```
 ##### jwt加密生成token
 ###### 什么是token
 token是服务器端生成的一串字符串，作为客户端进行请求的一个令牌。当用户登录后，服务器生成一个 Token 返回给客户端，之后客户端只需带上这个 Token 来请求数据即可，无需每次都输入用户名和密码来鉴权。
 ###### Token的组成 
  * header 
  ```js
  {
    type: "jwt",
    alg: "HS256"
  }
  ```
  * Playload 
  ```js
  iss (issuer): 签发人 
  exp (expiration time) : 过期时间 
  sub (subject) : 主题
  aud (audience) : 受众
  nbf (Not Before) : 生效时间
  iat (Issued At) : 签发时间 
  jti (JWT ID) : 编号
  
  //除了上面的信息外，可自定义其他私有字段，比如一些用户信息，但要注意敏感的信息不要存进来
  ```
  * Signature (secret)
  ```js
  HMACSHA256 (
    base64UrlEncode(header) + "." + base64UrlEncode(payload), secret
  )
  ```
  ##### 安装 jsonwebtoken 
  ```js
  npm install jsonwebtoken -s
  ```
  #####  jwt解密校验 
  * 安装 express-jwt 
  ```js
  npm install express-jwt
  ```
  * 校验 token，获取 headers 里的 Authorization 的 token
  ```js
  //前端 token 值格式 Bearer token

  const expressJwt = require('express-jwt')

  app.use(expressJWT({
    secret: PRIVATE_KEY
  }).unless({
    path: ['api/user/register', 'api/user/login'] 
    // 白名单，除了这里写的地址，其他的URL都需要验证
  })
  ```
 * 中间件错误处理  
 ```js
 if(err.name === 'UnauthorizedError') {
   // 需要根据自己的业务逻辑来处理 
   res.status(401).send({
      code: -1,
      msg: 'token验证失败'
    })
 }
 ```
 * 前端设置请求拦截 
 ```js
 import axios from 'axios'
import store from '@/store/index'

import {
  Message,
  Loading
} from 'element-ui'
const ConfigBaseURL = 'http://127.0.0.1:3000/' //默认路径，这里也可以使用env来判断环境
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'loading...'
  })
  // 登录token验证
  if(store.state.token) {
    config.headers['Authorization'] = `Bearer ${store.state.token}`
  } 
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  loadingInstance.close()
  // console.log(response)
  return response.data
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})

export default Service
 ```
 ##### 前端 cookie 缓存修改登录状态 
 缓存接口返回的token根据登录状态修改页面展示
 * 前端安装 js-cookie 
 ```js
 npm install js-cookie --save
 ```
 * 路由守卫  
 ```js
 import Cookie from 'js-cookie'
 router.beforeEach((to, from, next) => {
  store.commit('setToken', Cookie.get('token'))
  if (store.state.token) {
    //设置登录状态
    store.commit('changIsSigin', 1)
  }
  // 根据访问权限判断
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
 ```
 ##### 获取用户信息接口  
 ```js
 router.get('/info', async (req, res, next) => {
  let {
    username
  } = req.user
  try {
    let userInfo = await querySql('select * from user where username = ?', [username])
    if (userInfo.length) {
      res.send({
        code: 0,
        msg: '访问成功',
        data: userInfo[0]
      })
    } else {
      res.send({
        code: -1,
        msg: '访问错误'
      })
    }
  } catch (e) {
    console.log(e)
  }
})
 ```
 ##### 用户头像上传接口开发 
 * 安装 multer 
 ```js
 npm install --save multer
 ```
 * 配置 multer 
 ```js 
 const multer = require('multer')
const fs = require('fs')
const path = require('path')
 let upload = multer({
  storage: multer.diskStorage({
    // 设置文件存储位置
    destination: function (req, file, cb) {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let day = date.getDate()
      let dir = path.join(__dirname, '../public/uploads/' + year + month + day)
      console.log(dir)
      // 判断目录是否存在，没有则创建
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true
        })
      }

      // dir就是上传文件存放的目录
      cb(null, dir)
    },
    // 设置文件名称
    filename: function (req, file, cb) {
      let fileName = Date.now() + path.extname(file.originalname)
      // fileName就是上传文件的文件名
      cb(null, fileName)
    }
  })
})
 ```
 官方文档：https://www.npmjs.com/package/multer
 * 上传头像接口  
 ```js
 const {
  upload
} = require('../utils/index')
 router.post('/upload', upload.single('head_img'), async (req, res, next) => {
  console.log(req.file)
  let imgPath = req.file.path.split('public')[1]
  let imgUrl = 'http://127.0.0.1:3000' + imgPath
  res.send({
    code: 0,
    msg: '上传成功',
    data: imgUrl
  })
})
 ```
 ##### 用户信息更新接口 
 ```js
 router.post('/update', async (req, res, next) => {
  let {
    nickname,
    head_img
  } = req.body
  let {
    username
  } = req.user
  try {
    let result = await querySql('update user set nickname = ?, head_img= ? where username = ? ', [nickname, head_img, username])
    if (result.affectedRows) {
      res.send({
        code: 0,
        msg: '更新成功',
        data: null
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})
 ```
 ##### 博客接口开发
 ###### 新增博客接口开发  
 ```js
 var express = require('express');
var router = express.Router();
const querySql = require('../db/index')

//新增博客接口 
router.post('/add', async (req, res, next) => {
  let {
    title,
    content
  } = req.body
  let {
    username
  } = req.user

  try {
    let result = await querySql('select id from user where username = ? ', [username])
    let user_id = result[0].id
    if (user_id) {
      await querySql('insert into article(title,content,user_id,create_time) values (?,?,?,NOW())', [title, content, user_id])
      res.send({
        code: 0,
        msg: '新增成功'
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router;
 ```
 ###### 博客列表接口开发 
* 转换时间格式 
```js
DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%s") AS create_time
```
或者从前端进行转换 
```js
import dayjs from 'dayjs'
descTime (data) {
  return data ? dayjs(data).format('YYYY-MM-DD HH:mm') : ''
}
```
* 获取全部博客列表接口 
```js
router.get('/allList', async (req, res, next) => {
  try {
    // let sql = 'select * from article'
    let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article'
    /**
     * DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%s") AS create_time
     * 转换时间格式
     */
    let result = await querySql(sql)
    if (result) {
      res.send({
        code: 0,
        msg: '获取成功',
        data: result
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})
```
###### 我的博客列表接口
```js
router.get('/myList', async (req, res, next) => {
  console.log(req.user)
  let {
    id
  } = req.user

  try {
    let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article  where user_id = ? order by create_time desc'
    let result = await querySql(sql, [id])
    if (result) {
      res.send({
        code: 0,
        msg: '访问成功',
        data: result
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }

})
```
###### 博客详情接口开发
```js
//获取博客详情接口 
router.get('/detail', async (req, res, next) => {
  let article_id = req.query.article_id
  try {
    let sql = 'select content,title,id,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where id = ?'
    let result = await querySql(sql, [article_id])
    if (result) {
      res.send({
        code: 0,
        msg: '获取成功',
        data: result[0]
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})
```
###### 更新博客 
```js
// 博客更新接口 
router.post('/update', async (req, res, next) => {
  let {
    article_id,
    title,
    content
  } = req.body
  try {
    let sql = 'update article set title=?, content=? where id = ?'
    let result = await querySql(sql, [title, content, article_id])
    if (result.affectedRows) {
      res.send({
        code: 0,
        msg: '更新成功',
        data: null
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})
```
###### 博客删除  
```js
// 博客删除  - 软删除(只是给一个删除的状态)
router.post('/delete', async (req, res, next) => {
  let {
    article_id
  } = req.body
  let {
    id
  } = req.user
  try {
    let sql = 'update article set status = 1 where id = ? and user_id = ?'
    let result = await querySql(sql, [article_id, id])
    if (result.affectedRows) {
      res.send({
        code: 0,
        msg: '删除成功',
        data: null
      })
    }
  } catch (e) {

  }
})
```
##### 评论接口  
###### 发表评论 
```js
router.post('/publish', async (req, res, next) => {
  let {
    content,
    article_id
  } = req.body
  let {
    username
  } = req.user
  try {
    let userSql = 'select id,nickname,head_img from user where username =?'
    let user = await querySql(userSql, [username])
    let {
      id:user_id,
      head_img,
      nickname
    } = user[0]
    let sql = 'insert into comment (user_id, article_id, cm_content, nickname,head_img, create_time) values (?,?,?,?,?, NOW())'
    let result = await querySql(sql, [user_id, article_id, content, nickname, head_img])
    if (result.affectedRows) {
      res.send({
        code: 0,
        msg: '评论成功',
        data: null
      })
    }
  } catch (e) {
    next(e)
  }
})
```
###### 评论列表 
```js
router.get('/list', async (req, res, next) => {
  let {
    article_id
  } = req.query
  try {
    let sql = 'select id,head_img,nickname,cm_content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from comment where article_id = ? order by create_time desc'
    let result = await querySql(sql, [article_id])
    if (result) {
      res.send({
        code: 0,
        msg: '访问成功',
        data: result
      })
    }
  } catch (e) {
    next(e)
  }
})
```
#### 项目部署与上线 
##### 安装linux虚拟机服务器
* 安装 linux  cenOs 
* 查看 linux 服务器ip
  * 输入 ip addr 查看服务器ip,第一次查看ens33没有net属性
  * 



