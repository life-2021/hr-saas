<template>
    <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="新密码:" prop="password2">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 个人详情 -->
          <el-tab-pane label="个人详情">
              <!-- 动态组件 -->
              <component :is="UserComponent"/>   
          </el-tab-pane>
          <!-- 岗位详情 -->
          <el-tab-pane label="岗位详情">
            <component :is="JobComponent"/>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
    import { getUserDetailById } from '@/api/user'
    import { saveUserDetailById } from '@/api/employees'
    import JobInfo from './components/job-info.vue'
    import UserInfo from './components/user-info.vue'
    export default {
    components:{
        JobInfo,
        UserInfo
    },
    data() {
        return {
        userId: this.$route.params.id,
        JobComponent:'job-info',
        UserComponent:'user-info',
        userInfo: {
            username: '',
            password2: ''
        },
        rules: {
            username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
            password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
        }
        }
    },
    created() {
        this.getUserDetailById()
    },
    methods: {
        async getUserDetailById() {
        this.userInfo = await getUserDetailById(this.userId)
        },
        async saveUser() {
        try {
            await this.$refs.userForm.validate()
            await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 }) // 将新密码的值替换原密码的值
            this.$message.success('保存成功')
        } catch (error) {
            console.log(error)
        }
        }
    }
}
</script>

<style>

</style>