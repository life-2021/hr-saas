<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 右侧增加按钮 -->
      <page-tools :show-before="true">
        <template v-slot:before>
          <span slot="before">共{{ total }}条记录</span>
        </template>
        <template slot="after">
          <el-button size="small" type="primary" @click="toImport"
            >导入</el-button
          >
          <el-button size="small" type="primary" @click="showDialog = true"
            >+新增员工</el-button
          >
        </template>
      </page-tools>
      <el-table :data="employeesList" class="Table">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          sortable=""
          :formatter="formatEmployment"
          prop="formOfEmployment"
        />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template slot-scope="{ row }">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              @click="($event) => lookDeatilFn(row.id)"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRole(row.id)"
              >角色</el-button
            >
            <el-button type="text" size="small" @click="delEmployee(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          :current-page="page.page"
          :page-size="page.size"
          :total="total"
          @current-change="changePage"
          layout="prev, pager, next"
        />
      </el-row>
    </div>
    <!-- 添加员工 -->
    <add-employee :show-dialog.sync="showDialog" />
    <!-- 分配角色 -->
    <!-- <assign-role :show-role-dialog.sync="showRoleDialog" :userId="userId"/> -->
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from "@/api/employees";
import AddEmployee from "./components/add-employee.vue";
import EmployeeEnum from "@/api/constant/employees";
import assignRole from './components/assign-role.vue';
export default {
  data() {
    return {
      employeesList: [], //员工列表
      page: {
        page: 1, //页码
        size: 10, //每页条数
      },
      total: 0, //数据总条数
      showDialog: false,  //添加员工弹窗
      showRoleDialog:false, //分配角色弹窗
      userId:""
    };
  },
  methods: {
    //获取员工列表
    async getEmployeeList() {
      const res = await getEmployeeList(this.page);
      this.employeesList = res.data.data.rows;
      this.total = res.data.data.total;
    },
    //当前页面发生改变时触发
    changePage(newPage) {
      this.page.page = newPage;
      this.getEmployeeList();
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "未知";
    },
    //删除员工
    async delEmployee(id) {
      try {
        await this.$confirm("您确定删除该员工吗");
        await delEmployee(id);
        this.$message.success("删除员工成功");
        this.getEmployeeList();
      } catch (error) {
        console.log(error);
      }
    },
    lookDeatilFn(id) {
      this.$router.push(`/detail?id=${id}`);
    },
    //跳转详情页
    toImport() {
      this.$router.push(`/import`);
    },
    editRole(id){
      this.userId = id
      this.showRoleDialog = true
    }
  },
  mounted() {
    //获取员工列表
    this.getEmployeeList();
  },
  components: {
    AddEmployee,
    assignRole,
  },
};
</script>

<style>
.Table {
  width: 1300px;
}
</style>