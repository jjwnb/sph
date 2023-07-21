import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
// 登录注册模块
const state = {
    // 把仓库中相关用户信息清空，以及清除本地token
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的接口：把验证码返回，但是正常情况应该是后台把验证码发到用户手机上
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        // console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new error('faile'))
        }
    },
    //登录(token)
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            // 服务器下发的token是用户的唯一标识
            // 将来经常带token找服务器要数据
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        // console.log(result);
        if (result.code == 200) {
            // 提交用户信息
            commit('GETUSERINFO', result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 退出登录
    async logout({ commit }) {
        // 只是向服务器发请求，通知服务器清除token
        let result = await reqLogout()
        // console.log(result);
        // action里面不能操作state,提交mutation修改state
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}