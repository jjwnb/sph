import Vue from "vue";

import Vuex from "vuex";
// 需要使用插件一次
Vue.use(Vuex);
// 引入小仓库
import home from "./home";
import search from "./search";
import detail from './detail';
import shapcart from "./shopcart";
import user from "./user"
import trade from "./trade";



// 对外暴露stroe
export default new Vuex.Store({
  // 实现vuex仓库模块化开发存储数据
  modules: {
    home,
    search,
    detail,
    shapcart,
    user,
    trade
  },
});
