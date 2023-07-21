// 当前的模块：所有的api接口进行统一的管理
import requests from "./request";
import mockquerts from "./mock"

// 三级联动接口 /api/product/getBaseCategoryList    get  无参数
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });
// 发请求 axios发请求返回的是promise对象

//获取首页轮播图的结果(home首页轮播图)
export const reqGetBannerList = () =>
  mockquerts({ url: "/banner", method: 'get' })

//获取floor轮播图的结果
export const reqFloorList = () =>
  mockquerts({ url: "/floor", method: 'get' })

// 获取搜索模块  地址：/api/list 请求方式post、需要带参数
/**
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
// 当前函数需不需要接收外部传递的参数：需要
// 当前这个接口给服务器传递的params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: 'post', data: params })


// 获取产品详情 URL: /api/item/{skuID}    method:get
export const reqGoodsInfo = (skuID) => requests({ url: `/item/${skuID}`, method: 'get' })

// 将产品添加到购物车中,或者更新某一个产品个数  /api/cart/addToCart/{ skuId }/{ skuNum }    post
export const reqAddOrUpdataShopCart = (skuId, skuName) => requests({ url: `/cart/addToCart/${skuId}/${skuName}`, method: 'post' })

// 获取购物车列表数据 /api/cart/cartList  get
export const reqShopCart = () => requests({ url: "/cart/cartList", method: "get" })


// 请求删除购物车商品 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })


// 修改商品选中状态  /api/cart/checkCart/{skuId}/{isChecked} get
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })


// 注册   /api/user/passport/register  post  phone code password
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })

// 登录 /api/user/passport/login  post  phone code
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息{需要带用户token向服务器要用户信息}  /api/user/passport/auth/getUserInfo  token  get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录 /api/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取商品清单 /api/order/auth/trade   get
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: "get" })

// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })

// 获取订单支付信息  /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })

// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取个人中心的数据  /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page, limit) => requests({ url:`/order/auth/${page}/${limit}`,method:'get'})