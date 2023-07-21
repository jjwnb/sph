import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home小仓库
const state = {
  // state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组 【根据接口返回初始化的】
  categoryList: [],
  bannerList: [],
  floorList: []
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    // console.log('修改仓库中的数据');
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }

};
const actions = {
  // 通过api里面的接口函数调用，向服务器发送ajax请求 获取服务器数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  // 获取首页轮播图数据
  async getBannerList({ commit }) {
    // console.log('获取服务器数据');
    let result = await reqGetBannerList()
    // console.log(result);
    if (result.code === 200) {
      commit('BANNERLIST', result.data)
    }
  },
  // 获取floor轮播图数据
  async floorList({ commit }) {
    let result = await reqFloorList()
    console.log(result);
    if (result.code === 200) {
      commit('FLOORLIST', result.data)
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
