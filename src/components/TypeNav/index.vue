<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托 -->
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二,三级分类 -->
                <div class="item-list clearfix" v-show="currentIndex == index">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式是吧lodash全部功能引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕：可以向服务器发请求
  mounted() {

    // 当组件挂载完毕让show的属性变为false
    // 如果不是home路由组件将typenav进行隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 对象写法右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      // 鼠标进入修改响应式currentIndex属性
      this.currentIndex = index;
    }, 50),
    leaveshow() {
      // 鼠标移出删除class类
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的方法是利用编程式导航+事件委派
      // 事件委派的一些问题:1.点击的一定是a标签? 2.如何获取参数[1,2,3级分类产品的名字.id ]
      // 点击a标签的时候,才会进行路由跳转[怎么确定点击的一定是a标签?]
      // 即使点击的是a标签如何区分1,2,3级分类的标签
      // 1.把子节点的a标签中加上自定义属性data-categoryName 其余子节点是没有的
      let elemet = event.target;
      console.log(elemet.dataset);
      // 获取到当前触发事件的节点,需要带有data-categoryName的一定是a标签
      // 节点有一个dataset属性，可以获取自定义节点的属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        elemet.dataset;
      // 如果标签的身上拥有categoryName的属性 一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 怎么知道是一级分类、二级分类、三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候有params参数，也要捎带传过去
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 整理完参数
        // console.log(location, query);
        location.query = query;
        // 路由的跳转
        // console.log(location);
        this.$router.push(location);
        
      }
    },
    // 控制search页面的typeNav显示与隐藏
    entershow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
      .cur {
        background-color: skyblue;
      }
    }

    // 过渡动画样式
    // 过渡动画开始状态(进入 )
    .sort-enter {
      height: 0;
    }
    // 过渡动画结束状态
    .sort-enter-to {
      height: 461px;
    }
    .sort-leave {
      height: 461px;
    }
    .sort-leave-to {
      height: 0;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
    .sort-leave-active {
      transition: all 0.3s linear;
      overflow: hidden;
    }
  }
}
</style>
