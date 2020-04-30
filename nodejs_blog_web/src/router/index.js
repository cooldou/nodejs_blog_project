import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () => import('@/components/CommonLayout.vue'),
    children: [{
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/details/:id',
        component: () => import('@/views/Detail.vue')
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/Personal.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/Article.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/article/add',
        name: 'articleAdd',
        component: () => import('@/views/ArticleEdit.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/article/edit/:id',
        name: 'articleEdit',
        component: () => import('@/views/ArticleEdit.vue'),
        meta: {
          requireAuth: true // true 为这个页面需要登录权限
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router