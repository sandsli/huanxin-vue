import Vue from "vue";
import Router from "vue-router";

import Layout from '@/views/layout/Layout.vue'

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,

  routes: [
    {
      path: "",
      redirect: "home",
      component: Layout,
      children: [{
        name: 'home',
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: 'home', icon: 'home', noCache: true }
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue'),
    }
    // ,
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
