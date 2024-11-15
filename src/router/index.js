import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
import routers from '@/router/routes'


let routes = [
  {
    path: "/",
    redirect: '/index'
  },
  {
    path: "/index",
    name: 'layout',
    redirect: '/productManage',
    meta: {
      name: "首页",
    },
    component: () => import("@/components/layout/index"),
    // children
    children: [
      ...routers
    ]
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/login/login'),
  //   children: []
  // },
];
var router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: routes
});


export default router;
