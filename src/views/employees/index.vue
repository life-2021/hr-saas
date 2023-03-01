<template>
  <div class="dashboard-container">
    <div class="app-container">
    <!-- 右侧增加按钮 -->
      <page-tools :show-before="true">
        <template v-slot:before>
           <span slot="before">共16条记录</span>
        </template>
        <template slot="after">
            <el-button size="small" type="primary">导入</el-button>
            <el-button size="small" type="primary" @click="showDialog = true">+新增员工</el-button>
        </template>
      </page-tools>
        <el-table v-loading="loading" :data="list">
          <el-table-column label="序号" sortable="" />
          <el-table-column label="姓名" sortable="" />
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
          <el-pagination 
          :current-page="page.page"
          :page-size="page.size"
          :total="page.total"
          layout="prev, pager, next" 
          @current-change="changePage"
          />
        </el-row>
    </div>
    <add-employee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
    import { getEmployeeList } from '@/api/employees'
    import AddEmployee from './components/add-employee.vue'
    export default {
        data(){
            return{
                list:[],
                page:{
                    page:1,
                    size:10,
                    total:0
                },
                loading:false,
                showDialog:false
            }
        },
        created(){
            this.getEmployeeLista()
        },
        methods:{
            async getEmployeeLista() {
                this.loading = true
                const {total,rows} = await getEmployeeList()
                this.page.total = total
                this.list = rows
                this.loading = false
            }
        },
        components:{
          AddEmployee
        }
    }
</script>

<style scoped>
  
    
</style>