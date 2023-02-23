// 权限拦截路由跳转   导航守卫


import router from './router';
import store from './store';
// 引入进度条和样式
// import nprogress from 'nprogress';
// import "nprogress/nprogress.css";

// 设置没有token可以进入的路由白名单
const whiteList = ['/login','/404']

// 导航前置守卫
// next为必须执行的钩子：   通过：next()    阻止：next(false)    通跳转：next(地址)
router.beforeEach((to, from, next) => {
    // 开启进度条
    // nprogress.start()
    // 如果有token
    if (store.getters.token) {
      // 如果有token且访问的是主页
      if (to.path === "/login") {
        // 跳转到主页
        next("/");
      } else {
        next();
      }
      // 如果没有token
    } else {
      // 无token且访问的为白名单
      if (whiteList.indexOf(to.path) > -1) {
        // 放行
        next();
        // 无token且访问的为非白名单路由
      } else {
        // 跳转到登录
        next("/login");
      }
      //  解决手动切换地址时关闭进度条
      // nprogress.done();
    }
})

// 单行后置守卫
router.afterEach(() => {
    //  关闭进度条
    // nprogress.done()
});