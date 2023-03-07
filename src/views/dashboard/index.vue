<template>
  <div class="container">
    <!-- 头部（登陆者信息） -->
    <div class="Header">
      <div class="headPhoto">
        <img class="userImg" :src="userInfo.staffPhoto" alt="" />
      </div>
      <div class="hello">
        <p class="userName">早安，{{ userInfo.username }} ，祝你开心每一天！</p>
        <p>{{ userInfo.username }} | {{ userInfo.company }} - {{ userInfo.departmentName }}</p>
      </div>
    </div>
    <!-- end:头部 -->
    <div class="list-container">
      <!-- leftList -->
      <div class="list leftList">
        <!-- 日历 -->
        <div class="calendar">
          <h2 style="text-indent: 2rem">工作日历</h2>
          <el-divider></el-divider>
          <el-calendar class="date"> </el-calendar>
        </div>
        <!-- end:日历 -->
        <!-- 公告 -->
        <div class="announcementContainer">
          <h2 style="text-indent: 2rem">公告栏</h2>
          <el-divider></el-divider>
          <div class="announcementItems">
            <div class="headPhoto">
              <img src="@/assets/common/img.jpeg" alt="" />
            </div>
            <div class="content">
              <span> 朱继柳 发布了 第1期“传智大讲堂”互动讨论获奖名单公布 </span><br />
              <span>2018-07-21 15:21:38</span>
            </div>
          </div>
          <div class="announcementItems">
            <div class="headPhoto">
              <img src="@/assets/common/img.jpeg" alt="" />
            </div>
            <div class="content">
              <span> 朱继柳 发布了 第1期“传智大讲堂”互动讨论获奖名单公布 </span><br />
              <span>2018-07-21 15:21:38</span>
            </div>
          </div>
          <div class="announcementItems">
            <div class="headPhoto">
              <img src="@/assets/common/img.jpeg" alt="" />
            </div>
            <div class="content">
              <span> 朱继柳 发布了 第1期“传智大讲堂”互动讨论获奖名单公布 </span><br />
              <span>2018-07-21 15:21:38</span>
            </div>
          </div>
        </div>
        <!-- end:公告 -->
      </div>
      <!-- end：leftList -->

      <!-- rightList -->
      <div class="list rightList">
        <!-- 流程申请 -->
        <div class="moduleContainer .">
          <div class="moduleTitle">流程申请</div>
          <div class="moduleContent">
            <el-button plain @click="applyFormVisible = true">加班离职</el-button>
            <el-button plain @click="leaveFormVisible = true">请假调休</el-button>
            <el-button plain>审批列表</el-button>
            <el-button plain>我的信息</el-button>

            <!-- 加班离职表单 -->
            <applyForm :applyFormVisible="applyFormVisible" @applyFormCancel="applyFormCancel"> </applyForm>
            <!-- 请假调休表单 -->
            <leaveForm :leaveFormVisible="leaveFormVisible" @leaveFormCancel="leaveFormCancel"></leaveForm>
          </div>
        </div>
        <!-- 快速开始/便捷导航 -->
        <div class="moduleContainer .">
          <div class="moduleTitle">快速开始/便捷导航</div>
          <div class="moduleContent">
            <el-button plain>人事月刊</el-button>
            <el-button plain>考勤查询</el-button>
            <el-button plain>考勤统计</el-button>
            <el-button plain>员工审核</el-button>
            <el-button plain>组织架构</el-button>
          </div>
        </div>
        <!-- 帮助链接 -->
        <div class="moduleContainer .">
          <div class="moduleTitle">帮助链接</div>
          <div class="moduleContent">
            <div class="linkContainer">
              <div class="linkItems">
                <div class="phone"></div>
                入门指南
              </div>
              <div class="linkItems">
                <div class="compass"></div>
                在线帮助手册
              </div>
              <div class="linkItems">
                <div class="help"></div>
                联系技术支持
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end:rightList -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import applyForm from "./modules/applyForm.vue";
import leaveForm from "./modules/leaveForm.vue";
export default {
  data() {
    return {
      applyFormVisible: false,
      leaveFormVisible: false,
    };
  },
  methods: {

    // 关闭申请表单
    applyFormCancel() {
      this.applyFormVisible = false;
    },
    // 关闭请假表单
    leaveFormCancel() {
      this.leaveFormVisible = false;
    },
    // 跳转
    approvalsFn() {
      this.$router.push('/approvals');
    },
    userInfoFn() {
      this.$router.push('/userIfon');
    }

  },
  computed: {
    // 获取vuex中user模块中的token,userInfo
    ...mapState("user", {
      token: (state) => state.token,
      userInfo: (state) => state.userInfo,
    }),
  },

  components: {
    applyForm, //加班离职表单
    leaveForm, //请假调休表单
  },
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

  .headPhoto {
    // border: 1px solid black;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 30px 20px 20px 40px;
    .userImg {
      width: 100%;
      height: 100%;
    }
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
  height: 100vh;
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
      margin-bottom: 20px;
      overflow: hidden;

      ::v-deep .el-calendar-table {
        text-align: center;

        .el-calendar-day {
          width: 120px;
          height: 40px;

        }
      }

    }

    .announcementContainer {
      background-color: #ffffff;
      border-radius: 5px;
      overflow: hidden;

      .announcementItems {
        width: 90%;
        margin: 0 auto;
        border-bottom: 1px solid #dcdfe6;

        div {
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;

          img {
            height: 80px;
          }

          span {
            line-height: 30px;
          }
        }

        &:last-of-type {
          margin-bottom: 40px;
        }
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

.moduleContainer {
  background-color: #ffffff;
  border-radius: 5px;
  padding-bottom: 10px;
  margin-bottom: 20px;

  .moduleTitle {
    display: inline-block;
    border-bottom: 4px solid #8a97f8;
    margin-left: 50px;
    font-size: 24px;
    font-weight: 800;
    line-height: 60px;
  }

  .moduleContent {
    margin: 20px 50px;

    .el-button {
      width: 135px;
      height: 50px;
      margin: 10px 20px 10px 0;
    }

    .linkContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: baseline;

      .linkItems {
        position: relative;
        width: 100px;
        text-align: center;

        display: inline-block;
        vertical-align: top;

        // border: 1px solid black;
        div {
          margin: 0 auto 5px;
        }

        .compass {
          width: 67px;
          height: 67px;
          background: url(../../assets/common/icon.png) no-repeat -224px -8px;
        }

        .help {
          width: 75px;
          height: 76px;
          background: url(../../assets/common/icon.png) no-repeat -460px 0px;
        }

        .phone {
          width: 67px;
          height: 67px;
          background: url(../../assets/common/icon.png) no-repeat 0px -9px;
        }
      }
    }
  }
}
</style>
