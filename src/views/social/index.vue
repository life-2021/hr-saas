<template>
  <div>
    <!-- 头部工具栏 -->
    <div class="container topToolsContainer">
      <div class="message">
        <i class="el-icon-info" style="color: #409eff; font-size: 20px; margin-right: 10px;"></i>
        <span>本月：社保在缴 公积金在缴 增员 减员 入职 离职</span>
      </div>
      <div class="linkBtn">
        <el-button type="danger" size="mini">历史归档</el-button>
        <el-button type="primary" size="mini">当月报表</el-button>
      </div>
    </div>
    <!-- end：头部工具栏 -->

    <!-- 筛选栏 -->
    <div class="container screenContainer">
      <el-form label-width="100px">
        <!-- 部门筛选 -->
        <el-form-item label="部门" style="font-weight: 800;">
          <el-checkbox-group v-model="form.departmentChecks">
            <el-checkbox v-for="item in departmentsList" :key="item.id" :label="item.id" name="departments"
              @change="testFn">
              {{ item.name }}
            </el-checkbox>

          </el-checkbox-group>
        </el-form-item>
        <!-- 社保城市筛选 -->
        <el-form-item label="社保城市" style="font-weight: 800;">
          <el-checkbox-group v-model="form.socialSecurityChecks">
            <el-checkbox v-for="item in CitysList" :key="item.id" :label="item.id" name="socialCitys">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 公积金城市筛选 -->
        <el-form-item label="公积金城市" style="font-weight: 800;">
          <el-checkbox-group v-model="form.providentFundChecks">
            <el-checkbox v-for="item in CitysList" :key="item.id" :label="item.id"
              name="accumulationFundCitys">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <!-- end:筛选栏 -->

    <!-- 表格 -->
    <div class="container tableContainer">
      <!-- 表格本体 -->
      <div class="table">
        <el-table :data="SocialList" stripe style="width: 95%" :default-sort="{ prop: 'date', order: 'descending' }">
          <!-- 索引列-->
          <el-table-column type="index" :index="indexMethod" label="序号" width="70">
          </el-table-column>
          <!-- 姓名 -->
          <el-table-column prop="username" label="姓名" width="120" sortable>
          </el-table-column>
          <!-- 手机 -->
          <el-table-column prop="mobile" label="手机" width="160" sortable>
          </el-table-column>
          <!-- 工号 -->
          <el-table-column prop="id" label="工号" width="250" sortable>
          </el-table-column>
          <!-- 部门 -->
          <el-table-column prop="departmentName" label="部门" width="140" sortable>
          </el-table-column>
          <!-- 入职时间 -->
          <el-table-column prop="timeOfEntry" label="入职时间" width="160" sortable>
          </el-table-column>
          <!-- 离职时间 -->
          <el-table-column prop="leaveTime" label="离职时间" width="160" sortable>
          </el-table-column>
          <!-- 社保城市 -->
          <el-table-column prop="participatingInTheCity" label="社保城市">
          </el-table-column>
          <!-- 公积金城市 -->
          <el-table-column prop="providentFundCity" label="公积金城市">
          </el-table-column>
          <!-- 社保基数 -->
          <el-table-column prop="socialSecurityBase" label="社保基数">
          </el-table-column>
          <!-- 公积金基数 -->
          <el-table-column prop="providentFundBase" label="公积金基数">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <a href="#">查看详情</a>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="tableControl">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
          layout="total, prev, pager, next, jumper" :total="SocialListTotal">
        </el-pagination>
      </div>
    </div>
    <!-- end:表格 -->
  </div>
</template>

<script>
import { getDepartmentListAPI, getCitysListAPI, getSocialListAPI } from '@/api/social'
export default {
  data() {
    return {
      departmentsList: [],//部门列表
      CitysList: [],//城市列表
      SocialList: [],//社保表单数据
      SocialListTotal: 0,//社保表单数据总数
      currentPage: 1,//当前页数

      form: {
        departmentChecks: [],//筛选的部门列表
        socialSecurityChecks: [],// 筛选的社保城市列表
        providentFundChecks: [],// 筛选的的公积金城市列表
      },

    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        let reqData = Object.assign({ page: 1, pageSize: 10, total: 0 }, this.form);
        this.getSocialListFn(reqData)
      }
    },

  },
  methods: {
    // 表格索引列
    indexMethod(index) {
      return ++index;
    },
    // 表格排序
    formatter(row, column) {
      return row.address;
    },
    // 分页-第n页
    handleCurrentChange(val) {
      this.getSocialListFn({ page: val, pageSize: 10, total: 0 })
    },

    // 获取部门列表
    async getDepartmentListFn() {
      var res = await getDepartmentListAPI();
      this.departmentsList = res.data.data.depts;
    },
    // 获取城市列表
    async getsocialCitysListFn() {
      var res = await getCitysListAPI();
      this.CitysList = res.data.data;
    },
    // 获取社保表格列表
    async getSocialListFn(data) {
      data ? data : data = { page: 1, pageSize: 10, total: 0 };
      var res = await getSocialListAPI(data);
      this.SocialList = res.data.data.rows;
      this.SocialListTotal = res.data.data.total;
    }
  },
  mounted() {
    // 获取部门列表
    this.getDepartmentListFn()
    // 获取城市列表
    this.getsocialCitysListFn()
    //获取社保信息列表
    this.getSocialListFn()
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 15px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
}

.topToolsContainer {
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

.tableContainer {
  text-align: center;
  position: relative;

  .table {
    margin-bottom: 60px;
  }

  .tableControl {
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translateX(-70%);

  }
}
</style>