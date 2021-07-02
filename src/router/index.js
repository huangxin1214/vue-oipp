import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

const routes = [
  // 注册路由
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/Register'),
    meta: {
      title: '注册'
    }
  },
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录'
    }
  },

  // 公共路由
  {
    path: '',
    component: Layout,
    // 子路由: children
    children: [
      // 首页路由
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          index: '/'
        }
      },
      // 已发布
      {
        path: '/Publish',
        name: 'Publish',
        component: () => import('../views/publish/Publish'),
        meta: {
          title: '已发布',
          index: '/Publish'
        }
      },
      // 统计
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('../views/statistics/Statistics.vue'),
        meta: {
          title: '统计',
          index: '/statistics'
        }
      },
      // 发布文章
      {
        path: '/essay',
        name: 'essay',
        component: () => import('../views/essay/Essay.vue'),
        meta: {
          title: '发布文章',
          index: "/essay"

        }
      },
      // 编辑
      {
        path: '/well',
        name: 'well',
        component: () => import('../views/well/Well.vue'),
        meta: {
          title: '编辑文章',
          index: '/well'
        }
      },
      // 查看
      {
        path: '/vieww',
        name: 'vieww',
        component: () => import('../views/vieww/vieww.vue'),
        meta: {
          title: '查看文章',
          index: '/vieww'
        }
      },
      // 标签
      {
        path: '/norm',
        name: 'norm',
        component: () => import('../views/norm/Norm.vue'),
        meta: {
          title: '标签',
          index: "/norm"
        }
      },
      // 导出
      {
        path: '/derive',
        name: 'derive',
        component: () => import('../views/derive/Derive.vue'),
        meta: {
          title: '导出',
          index: '/derive'
        }
      },
      // 图片上传
      {
        path: '/picture',
        name: 'picture',
        component: () => import('../views/picture/Picture.vue'),
        meta: {
          title: '图片上传',
          index: '/picture'
        }
      },
      // 退出系统
      {
        path: '/outt',
        name: 'outt',
        component: () => import('../views/outt/Outt.vue'),
        meta: {
          title: '退出',
          index: "/outt"
        }
      },
    ],

  },
  // 404
  {
    path: '*',
    component: () => import('../views/404/404.vue'),
    meta: {
      title: '404页面'
    }

  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('vue-name')
  document.title = to.meta.title
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    user ? next() : next('/login')
  }
});




export default router
