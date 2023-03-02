<template>
  <div class="dashboard-container">
    <div class="app-container">
    <!-- 右侧增加按钮 -->
      <page-tools :show-before="true">
        <template v-slot:before>
           <span slot="before">共{{ total }}条记录</span>
        </template>
        <template slot="after">
            <el-button size="small" type="primary">导入</el-button>
            <el-button size="small" type="primary" @click="showDialog = true">+新增员工</el-button>
        </template>
      </page-tools>
        <el-table  :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username"/>
          <el-table-column label="头像" sortable="" />
          <el-table-column label="手机号" sortable="" />
          <el-table-column label="工号" sortable="" />
          <el-table-column label="聘用形式" sortable="" />
          <el-table-column label="部门" sortable="" />
          <el-table-column label="入职时间" sortable="" />
          <el-table-column label="账户状态" sortable="" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" />
        </el-row>
    </div>
    <!-- <add-employee :show-dialog.sync="showDialog" /> -->
  </div>
</template>

<script>
    import { getEmployeesListAPI } from '@/api/employees'
    // import AddEmployee from './components/add-employee.vue'
    export default {
        data(){
            return{
                employeesList:[],  //员工列表
                query:{
                    page:1,    //页码
                    size:10,   //每页条数
                },
                total:0,    //数据总条数
                showDialog:false
            }
        },
        methods:{
            async getEmployeeListFn() {
                const res = await getEmployeesListAPI(this.query)
                console.log(res)
                this.employeesList = res.data.rows
                this.total = res.data.total
            }
        },
        created(){
            this.getEmployeeListFn()
        },
        // components:{
        //   AddEmployee
        // }
    }
</script>

<style>
  
</style>