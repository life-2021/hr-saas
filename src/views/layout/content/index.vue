<template>
  <div>
    <!-- 右侧内容区 -->
    <!-- 头部 -->
    <div class="header">
      <!-- 折叠图标 -->
      <div class="collapse">
        <div v-if="!isCollapse" class="ico el-icon-s-fold" @click="changeIsCollapse"></div>
        <div v-else class="ico el-icon-s-unfold" @click="changeIsCollapse"></div>
        <div class="itile">南昌中兴软件技术公司</div>
        <div class="full"><i class="el-icon-full-screen"></i></div>
        <div class="user">
          <el-dropdown>
            <span class="el-dropdown-link" size="medium">管理员<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-home"  @click.native="goHomePage">首页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="logoutFn">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 内容区 -->
    <div>
      <!-- 二级路由入口 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {

  props: {
    isCollapse: Boolean,
  },
  methods: {
    // 侧边栏折叠
    changeIsCollapse() {
      this.$emit("changeIsCollapse");
    },
    // 退出登录
    logoutFn() {
      // 清理token
      this.$store.dispatch('user/logout');
      // 跳转到登陆页面
      this.$router.push('/login')
    },
    goHomePage() {
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 60px;
  background-color: #4878fb;

  .ico {
    font-size: 40px;
    line-height: 50px;
    margin-left: 5px;
  }

  .itile {
    display: inline-block;
    position: absolute;
    font-size: 24px;
    line-height: 50px;
    margin-left: 40px;
    color: #fff;
  }

  .full {
    display: inline-block;
    position: absolute;
    right: 150px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }

  .user {
    display: inline-block;
    position: absolute;
    right: 30px;
    font-size: 24px;
    line-height: 50px;
  }
}
</style>
