import { reqGetSearchInfo } from "@/api";


// search小仓库
const state = {
  //仓库初始状态
  searchList: {}
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
};
const actions = {
  // 获取模块数据
  async getSearchList({ commit }, params = {}) {
    // reqGetSearchInfo这个函数在调用获取服务器数据的时候知识传递一个参数（空对象）
    // parmas形参是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      // console.log(result);
      commit('GETSEARCHLIST', result.data)
    }
  }
};
// 计算属性，是为了简化数据而生
// 当前getters的主要作用是：简化仓库中的数据
// 可以把我们将来在组件中需要用到的数据简化一下【方便将来组件获取数据】
const getters = {
  // 当前形参是当前仓库中的state并非大仓库中的state
  goodsList(state) {
    // state.searchList.goodsList 如果服务器给力，没问题是一个数组
    // 假如网络不给力（没有网络）state.searchList.goodsList应该返回的undefined
    // 计算新的属性的属性值至少给人家来一个数组
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }
};

export default {
  // namespaced: true, //开启命名空间
  state,
  mutations,
  actions,
  getters,
};
