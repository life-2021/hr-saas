<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 登录页面标题容器 -->
      <div class="title-container">
        <h3 class="title">
          <!-- 该图片为标题 -->
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>
      <!-- 用户名 -->
      <!-- prop属性 需要被校验的数据名称 -->
      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 登录 -->
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px; background-color: #407ffe"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
      <!-- 提示 -->
      <div class="tips">
        <span style="margin-right: 20px">userName: 13800000002</span>
        <span> password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    // 规则校验函数：rule（规则），value（被校验的值），callback（回调函数）
    const validateMobile = (rule, value, callback) => {
      validMobile(value)
        ? callback()
        : callback(new Error("请输入正确的手机号！"));
    };
    
    return {
      // 账户信息
      loginForm: {
        mobile: "13800000002",
        password: "123456",
        'Content-Type':'application/json',
      },
      // 校验规则
      loginRules: {
        // 校验规则说明：required（是否必填），trigger（触发事件），validator（自定义规则校验函数）
        mobile: [
          { required: true, trigger: "blur", message: "手机号不能为空！" },
          {
            validator: validateMobile,
            trigger: "blur",
            message: "请输入正确的手机号！",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空！" },
          { min: 6, max: 16, trigger: "blur", message: "密码长度应在6-16个字符" },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['user/login']),//引入user空间内的login方法
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async isOK => {
        if (isOK) {
          try {
            this.loading = true;
            // console.log(this.loginForm)
            await this['user/login'](this.loginForm) //调用user空间的login方法
            this.$router.push('/')
          } catch (error) {
            console.error(error)
          }
          finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe; //输入框颜色
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // 背景图 注意在样式中使用@符号需要在@前面加~
  height: 100vh;
  width:100vw;
  background-image: url(~@/assets/common/login.jpg);
  // 图片居中
  background-position: center;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  // 输入框背景色
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
