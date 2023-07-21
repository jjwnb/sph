<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="floor2Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in fl" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
export default {
  name: "Carsoule",
  props: ["fl"],
  watch: {
    fl: {
      // 立即监听：不管数据有没有变化 一上来立即监听一次
      //为什么watch监听不到list的变化：因为这个数据重来没有发生变化(数据是父组件home传递过来的，父亲给的时候就是一个对象，而且对象里面有数据)
      immediate: true,
      handler() {
        // 只能监听到数据已经有了 但是v-for动态渲染的结构我们还是没有办法确定，因此还是需要用到nextTick
        this.$nextTick(function () {
          var mySwiper = new Swiper(this.$refs.floor2Swiper, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>
