<template>
  <div>
    <!-- 头部工具栏 -->
    <div class="container topTools">
      <div class="message">
        <i class="el-icon-info" style="color: #409eff; font-size: 20px; margin-right: 10px;"></i>
        <span>本月：社保在缴 公积金在缴 增员 减员 入职 离职</span>
      </div>
      <div class="linkBtn">
        <el-button type="danger" size="mini">获取部门</el-button>
        <el-button type="danger" size="mini">历史归档</el-button>
        <el-button type="primary" size="mini">当月报表</el-button>
      </div>
    </div>
    <!-- end：头部工具栏 -->

    <!-- 筛选栏 -->
    <div class="container screen">
      <el-form label-width="100px">
        <!-- 部门筛选 -->
        <el-form-item label="部门" style="font-weight: 800;">
          <el-checkbox-group v-model="form.departmentChecks">
            <el-checkbox label="总裁办" name="departments"></el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <!-- 社保城市筛选 -->
        <el-form-item label="社保城市" style="font-weight: 800;">
          <el-checkbox-group v-model="form.socialCitys">
            <el-checkbox label="北京" name="socialCitys"></el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <!-- 公积金城市筛选 -->
        <el-form-item label="公积金城市" style="font-weight: 800;">
          <el-checkbox-group v-model="form.accumulationFundCitys">
            <el-checkbox label="北京" name="accumulationFundCitys"></el-checkbox>

          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <!-- end:筛选栏 -->

    <!-- 表格 -->
    <div class="container">
      <el-table :data="tableData" stripe style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
        <!-- 索引列-->
        <el-table-column type="index" :index="indexMethod" label="序号" width="60">
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" width="180" sortable>
        </el-table-column>
        <!-- 手机 -->
        <el-table-column prop="mobile" label="手机" width="180" sortable>
        </el-table-column>
        <!-- 工号 -->
        <el-table-column prop="id" label="工号" sortable>
        </el-table-column>
        <!-- 部门 -->
        <el-table-column prop="department" label="部门" sortable>
        </el-table-column>
        <!-- 入职时间 -->
        <el-table-column prop="entryTime" label="入职时间" sortable>
        </el-table-column>
        <!-- 离职时间 -->
        <el-table-column prop="leaveTime" label="离职时间" sortable>
        </el-table-column>
        <!-- 社保城市 -->
        <el-table-column prop="socialCity" label="社保城市">
        </el-table-column>
        <!-- 公积金城市 -->
        <el-table-column prop="accumulationFundCity" label="公积金城市">
        </el-table-column>
        <!-- 社保基数 -->
        <el-table-column prop="socialTimes" label="社保基数">
        </el-table-column>
        <!-- 公积金基数 -->
        <el-table-column prop="socialTimes" label="公积金基数">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <a href="#">查看详情</a>
        </el-table-column>
      </el-table>
    </div>
    <!-- end:表格 -->
  </div>
</template>

<script>
import { getDepartmentListAPI } from '@/api/social'
export default {
  data() {
    return {
      departmentsList: [],
      form: {
        departmentChecks: [],//筛选部门
        socialCitys: [],// 筛选社保城市
        accumulationFundCitys: [],// 筛选的公积金城市
      },
      tableData: [{
        name: '管理员',//姓名
        mobile: '13800000002',//手机
        id: '99999',//工号
        department: '总裁办',//部门
        entryTime: '2008-01-01',//入职时间
        leaveTime: '',//离职时间
        socialCity: '北京',//社保城市
        accumulationFundCity: '北京', //公积金城市
        socialTimes: '10000',//社保基数
        socialTimes: '10000', //公积金基数
      },
      ]
    }
  },
  methods: {
    // 处理报个索引列
    indexMethod(index) {
      return ++index;
    },
    // 处理表格排序
    formatter(row, column) {
      return row.address;
    },
    // 获取部门列表
    async getDepartmentListFn() {
      var res = await getDepartmentListAPI();
      this.departmentsList = res.data.data.depts;
      console.log(this.departmentsList);
    }
  },
  mounted() {
    // 获取部门列表
    this.getDepartmentListFn()
  }

}
</script>

<style lang="scss" scoped>
.container {
  margin: 15px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.topTools {
  div {
    display: inline-block;
  }

  .message {
    display: inline-block;
    padding: 5px 15px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 5px;
  }

  .linkBtn {
    position: absolute;
    right: 5%;
  }
}
</style>