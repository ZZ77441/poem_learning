import Vue from 'vue'
import VueRouter from 'vue-router'
import UserView from '../views/UserView.vue'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/UserLogin.vue'
import UserPerson from '../views/UserPerson.vue'
import AdminView from '../views/AdminView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminHome from '../views/AdminHome.vue'

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
        component: AdminHome
      }

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
