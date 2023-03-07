<template>
  <div class="layout">
    <!-- 左侧 -->
    <div class="aside">
      <!-- 左侧导航 -->
      <Aside :isCollapse="isCollapse" />
    </div>
    <!-- 右侧 -->
    <div class="right" :class="{ small: isCollapse }">
      <Content @changeIsCollapse="changeIsCollapse" :isCollapse="isCollapse"> </Content>
    </div>
  </div>
</template>

<script>
import Content from "./content/index.vue";
import Aside from "./aside/index.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isCollapse: false, //是否折叠
    };
  },
  methods: {
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 获取用户基本数据
    ...mapActions("user", {
      getUserProfileFn: "getUserProfile",
    }),
  },
  components: {
    Content,
    Aside,
  },
  mounted() {
    // 获取用户信息
    this.getUserProfileFn();

  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;

  .aside {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    // width: 200px;
    background-color: #68a4fe;
    background-image: url(../../assets/common/leftnavBg.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: 0 100%;
  }

  .right {
    padding-left: 200px;
    flex: 1;
    transition: all 0.25s linear;
  }

  .small {
    padding-left: 64px;
  }
}</style>
