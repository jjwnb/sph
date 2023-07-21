// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
import routes from "./routes"
// 引入仓库
import store from "@/store";

// 先把vuerouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originreplace = VueRouter.prototype.replace;
// 重写push和replace方法
// 第一个参数 告诉原来的push方法 你往哪里跳，以及传递哪些参数
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    console.log(this);
    //call与apply的区别：
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, reslove, reject);
  } else {
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};

VueRouter.prototype.replace = function (location, reslove, reject) {
  if (reslove && reject) {
    originreplace.call(this, location, reslove, reject);
  } else {
    originreplace.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
// 配置路由
let router = new VueRouter({
  routes,
  // 滚动行为  
  scrollBehavior(to, form, savedPosition) {
    // 返回的y=0，代表的是滚动条在最上分
    return { y: 0 }
  }
});
// 全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, form, next) => {
  // to:可以获取到跳转到哪个路由的信息
  // form:可以获取到你从哪个路由来的信息
  // next:放行函数 next() 放行
  // next:(path) 放行到指定的路由   next(false)
  // 用户登录了才会有token，未登录一定不会有token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  // 用户已经登录
  if (token) {
    // 用户登录了还行去login 不行
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      // 登录了但是，去的不是login，可能是【home,search,datail,shopcart】
      // 如果用户名已有就不用拦了
      if (name) {
        next()
      } else {
        try {
          // 没有用户信息
          // 派发action让仓库存储用户信息再跳转 
          await store.dispatch("getUserInfo");
          next()
        } catch (error) {
          // token过期了 获取不到用户信息
          //  清除过期token  重新登录
          await store.dispatch('logout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录  不能去交易相关的页面，不能去支付相关的页面【pay|paysuccess】,以及个人中心【center】
    // 未登录去上面的这些页面应该去----登陆
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/paysuccess') != -1) {
      // 把未登录想去而没有去成的信息，存储于地址栏中
      next('/login?redirect=' + toPath)
    } else {
      //去的不是上面这些路由(home|search|shopcart)应该放行
      next()
    }
  }
})
export default router
