import { reqGoodsInfo, reqAddOrUpdataShopCart } from '@/api';
// 封装临时游客身份模块uuid 生成一个随机字符串
import { getUUID } from '@/utils/uuid_token'
const state = {
    GoodsInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state, getGoodsInfo) {
        state.GoodsInfo = getGoodsInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async AddOrUpdataShopCart({ commit }, { skuid, skuNum }) {
        // 加入购物车返回的结果
        // 加入购物车发请求,前台将参数带给服务器
        // 服务器写入数据库,并没有返回其他数据,只是返回code=200代表这次操作成功
        // 因为服务器没有返回其余的数据,因此我们不需要三连环存储数据
        let result = await reqAddOrUpdataShopCart(skuid, skuNum)
        // 当前的这个函数如果执行返回Promise
        // 代表服务器加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }

}
// 简化数据
const getters = {
    // 简化路径导航数据
    categoryView(state) {
        // 比如state.goodInfo.categoryView起始状态是一个空对象，categoryView的属性值是undefined
        // 当前计算出的 categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.GoodsInfo.categoryView || {}
    },
    // 简化产品信息数据
    skuInfo(state) {
        // 比如state.goodInfo.categoryView起始状态是一个空对象，categoryView的属性值是undefined
        // 当前计算出的 categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.GoodsInfo.skuInfo || {}
    },
    // 简化产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.GoodsInfo.spuSaleAttrList || []
    }


}

export default {
    state, mutations, actions, getters
}