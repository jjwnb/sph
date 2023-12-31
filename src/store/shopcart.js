import { reqShopCart, reqDeleteCartById, reqUpdateCheckedByid } from "@/api"
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //  获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqShopCart()
        console.log(result);
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车商品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context:小仓库 commit[提交mutations修改state] getters 计算属性 disptch派发cation state当前仓库的数据
        //    获取购物车中全部的产品(是一个数组)
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            PromiseAll.push(item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '')
            // 将每一次返回的promise添加到数组中
            // console.log(PromiseAll);
        });
        // 只要全部的promise都成功返回的结果即为成功,如果有一个失败返回失败结果
        return Promise.all(PromiseAll)
    },
    // 修改全部产品状态
    updeteAllCartChecked({ dispatch, state }, checked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked: checked })
            PromiseAll.push(promise)

        })
        // 最终返回结果
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    cartInfoList(state) {
        return state
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}