<template>
  <div>
    <!-- 左侧工具栏 -->

    <div class="menu">
      <el-menu
        default-active="$router.path"
        class="el-menu-vertical-demo"
        background-color="#68a4fe"
        text-color="#fff"
        active-text-color="#000"
        :collapse="isCollapse"
        router
      >
        <div class="logo" :class="{small:isCollapse}"><img src="../../../assets/common/logo.png" alt=""/></div>
        <el-menu-item index="/dashboard">
          <i class="el-icon-odometer"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/departments">
          <i class="el-icon-s-grid"></i>
          <span slot="title">组织架构</span>
        </el-menu-item>

        <el-menu-item index="/employees">
          <i class="el-icon-user"></i>
          <span slot="title">员工</span>
        </el-menu-item>

        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">公司设置</span>
        </el-menu-item>

        <el-menu-item index="/salarys">
          <i class="el-icon-setting"></i>
          <span slot="title">工资</span>
        </el-menu-item>

        <el-menu-item index="/social">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">社保</span>
        </el-menu-item>

        <el-menu-item index="/attendances">
          <i class="el-icon-date"></i>
          <span slot="title">考勤</span>
        </el-menu-item>

        <el-menu-item index="/permission">
          <i class="el-icon-set-up"></i>
          <span slot="title">权限管理</span>
        </el-menu-item>

        <el-menu-item index="/approvals">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">审批</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    isCollapse: Boolean,//是否折叠
  },
  methods:{

  }
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  padding: 5px;
  img{
    width: 70%;
  }
}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .small{
    width: 64px;
  }
</style>
