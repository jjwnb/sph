import Vue from "vue";
import App from "./App.vue";
import { Button, MessageBox } from 'element-ui';
// 三级联动组件（全局）
import TypeNav from "@/components/TypeNav";
// 轮播图全局组件
import Carsoule from '@/components/Carsoule';
// 引入分页组件
import Pagination from '@/components/Pagination';
// 注册全局组件第一个参数为全局组件的名字 第二个参数是哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsoule.name, Carsoule)
Vue.component(Pagination.name, Pagination)
//第一张方式，注册全局组件
Vue.component(Button.name, Button);
// 第二种方式，挂载到原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from "@/router";
Vue.config.productionTip = false;
// 引入仓库store
import store from "@/store";
// 引入mockserve
import '@/mock/mockServe';
// 引入swiper
import 'swiper/css/swiper.css';

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入懒加载的图片
import atm from '@/assets/atm.gif'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: atm,
})
// 引入自定义插件
import myPlugins from "@/plugins/myPlugins"
Vue.use(myPlugins, {
  name: "upper"
})
// 引入表单验证插件
import "@/plugins/validate"
// 统一接收api文件里面的全部请求函数
// 统一引入
import * as API from '@/api'
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API
    Vue.config.errorHandler = function (error, vm) {
      console.error(error)
    }
  },
  // 注册路由kv一致省略v{router是小写的}
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$router ,$route属性
  /*   - $router：一般进行编程式导航进行路由跳转
  - $route： 一般获取路由信息（name path params等） */
  router,
  // 注册仓库：组件实例身上会多了一个属性叫$store属性
  store,
}).$mount("#app");
