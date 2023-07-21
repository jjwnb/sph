<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件 则不需要引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- floor组件在自己组件内部是没有发请求的 数据是父组件给的 -->
    <Floor v-for="fl in floorList" :key="fl.id" :fl="fl"></Floor>

    <Brand></Brand>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ListContainer from "@/views/Home/ListContainer";
import Recommend from "@/views/Home/Recommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";
export default {
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    //派发action 获取floor组件的数据
    this.$store.dispatch("floorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style></style>
