import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '@/components/home/Map'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Profile from '@/components/profile/Profile'
import Ping from '@/components/home/Ping'
import Story from '@/components/home/Story'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Map',
    component: Map,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/ping',
        name: 'Ping',
        component: Ping,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'story/:id',
        name: 'Story',
        component: Story
      }
    ]
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router