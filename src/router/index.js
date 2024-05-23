import Vue from 'vue'
import VueRouter from 'vue-router'
import UserView from '../views/UserView.vue'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/UserLogin.vue'
import UserPerson from '../views/UserPerson.vue'
import AdminView from '../views/AdminView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminHome from '../views/AdminHome.vue'
import UserManage from '../views/UserManage.vue'
import PoemManage from '../views/PoemManage.vue'
import AdminCharts from '../views/AdminCharts.vue'
import CategoryView from '@/views/CategoryView.vue'
import PoemView from '@/views/PoemView.vue'



Vue.use(VueRouter)

const routes = [
  // {
  //   //查找不到的路由导向首页
  //   path: '*',
  //   redirect: '/'
  // },
  {
    path: '/',
    redirect: '/home',
    name: 'userview',
    component: UserView,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'login',
        name: 'user_login',
        component: UserLogin
      },
      {
        path: 'person',
        name: 'user_person',
        component: UserPerson
      },
      {
        path: 'category',
        name: 'user_category',
        component: CategoryView,
        children: [
          {
            path: 'poemview',
            component: PoemView
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    redirect: '/admin/login',
    name: 'adminview',
    component: AdminView,
    children: [
      {
        path: 'login',
        name: 'admin_login',
        component: AdminLogin
      },
      {
        path: 'home',
        name: 'admin_home',
        redirect: '/admin/home/charts',
        component: AdminHome,
        children: [
          {
            path: 'user',
            name: 'user_manage',
            component: UserManage
          },
          {
            path: 'poem',
            name: 'poem_manage',
            component: PoemManage
          },
          {
            path: 'charts',
            name: 'admin_charts',
            component: AdminCharts
          }
        ]
      },


    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {

  if (to.path === '/person') {
    // 需要判断登录状态的页面路径
    if (localStorage.getItem("user") !== null) {
      // 用户已登录，允许导航到 Person 页面
      next();
    } else {
      // 用户未登录，导航到登录页面
      next('/login');
    }
  } else {
    // 其他页面无需登录状态检查，直接导航
    next();
  }

  //管理员界面同理
  if (to.path === '/admin/home') {
    if (localStorage.getItem("admin") !== null) {
      next();
    } else {
      next('/admin/login');
    }
  } else {
    next();
  }

});




export default router
