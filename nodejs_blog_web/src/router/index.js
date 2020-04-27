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
        component: () => import('@/views/Personal.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/Article.vue')
      },
      {
        path: '/article/add',
        name: 'articleAdd',
        component: () => import('@/views/ArticleEdit.vue')
      },
      {
        path: '/article/edit/:id',
        name: 'articleEdit',
        component: () => import('@/views/ArticleEdit.vue')
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