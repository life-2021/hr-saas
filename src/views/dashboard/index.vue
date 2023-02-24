<template>
  <div class="container">
    <!-- 头部（登陆者信息） -->
    <div class="Header">
      <img class="userImg" src="@/assets/common/head.jpg" alt="" />
      <div class="hello">
        <p class="userName">早安，管理员，祝你开心每一天！</p>
        <p>管理员 | 传智播客-总裁办</p>
      </div>
    </div>
    <div class="list-container">
      <!-- leftList -->
      <div class="list leftList">
        <!-- 日历 -->
        <div class="calendar">
          <h2 style="text-indent: 2rem">工作日历</h2>
          <el-divider></el-divider>
          <el-calendar class="date"> </el-calendar>
        </div>
      </div>
      <!-- rightList -->
      <div class="list rightList">
        <!-- 流程申请 -->
        <div class="apply">
          <span
            style="border-bottom:4px solid #8a97f8; font-size: 24px; font-weight: 800; line-height: 60px; padding-lef;"
            >流程申请</span
          ><button @click="testFn">获取</button>
          <el-divider></el-divider>
          <p>user{{ userInfo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions('user',{
      testFn: "getUserProfile",
    }),
  },
  computed: {
    // 获取vuex中user模块中的token,userInfo
    ...mapState("user", {
      token: (state) => state.token,
      userInfo: (state) => state.userInfo,
    }),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f0f2f5;
  border-top: 1px solid rgb(0, 0, 0, 0);
}
.Header {
  background-color: #ffffff;
  width: 97%;
  margin: 20px auto 0;
  border-radius: 5px;
  height: 150px;
  div {
    display: inline-block;
  }
  .userImg {
    margin: 20px 0 0 50px;
  }
  .hello {
    position: absolute;
    margin: 20px 0 0 20px;
    .userName {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
}
.list-container {
  margin-top: 20px;
  width: 97%;
  margin: 20px auto 0;
  position: relative;

  .list {
    display: inline-block;
    vertical-align: top;
  }
  .leftList {
    width: 53%;
    margin-right: 15px;
    .calendar {
      background-color: #ffffff;
      border-radius: 5px;
      overflow: hidden;
      transform: scale(1, 1);
      ::v-deep .el-calendar-table .el-calendar-day {
        width: 100px;
        height: 40px;
        text-align: center;
      }
    }
  }
  .rightList {
    position: absolute;
    top: 0;
    right: 0;
    width: 46%;
    .apply {
      background-color: #ffffff;
      border-radius: 5px;
      padding: 0 25px 0;
    }
  }
}
</style>
