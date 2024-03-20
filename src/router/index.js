import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
import routers from '@/router/routes'

const routeArr = []
for (const key in routers) {
  if (routers[key].menuDisabled){
    routers[key].children.forEach(item => {
      if (item.path && item.component){
          routeArr.push({
            path: item.path,
            name: item.pathName,
            component: item.component,
            meta: item.meta || {},
          })
      }
      if (item.children){
        item.children.forEach(j => {
          routeArr.push({...j})
        })
      } 
    });
  } else {
     routeArr.push({
          path: routers[key].path,
          name: routers[key].name,
          component: routers[key].component,
          meta: routers[key].meta || {},
    })
  }
}
let routes = [
  {
    path: "/",
    redirect: '/index'
  },
  {
    path: "/index",
    name: 'layout',
    meta: {
      name: "首页",
    },
    component: () => import("@/layout/index"),
    // children
    children: [
      ...routeArr
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/login/login'),
    children: []
  },


];
var router = new Router({
  mode: 'hash',
  routes: routes
});


export default router;
