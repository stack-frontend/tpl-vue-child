import App from '../App.vue'
import Home from '../views/Home.vue'

const APP_NAME = process.env.VUE_APP_NAME

const routes = [
  {
    path: `/${APP_NAME}`, // first level routes must start with '/', nested routes must not start with '/'
    redirect: `/${APP_NAME}/home`,
    component: App,
    meta: {},
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }

]

export default routes
