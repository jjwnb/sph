// 引入mockjs模块
import Mock, { mock } from "mockjs"
// 引入JSON数据格式引入进来
// webpack默认对外暴露的：图片、JSON数据格式、
import banner from "./banner.json"
import floor from "./floor.json"

// mock数据:第一个参数请求的地址，第二个参数请求数据
Mock.mock("/mock/banner",{code:200,data:banner}) //模拟banner数据(首页大轮播图)
Mock.mock("/mock/floor",{code:200,data:floor}) //模拟floor数据()
// 之后将mock文件在入口文件中引入 (至少要执行一次才能模拟数据)