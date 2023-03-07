<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <!-- 前面内容 -->
        <template v-slot:before>有 23 条考勤审批尚未处理</template>
        <template v-slot:after>
          <el-button size="mini" type="danger">导入</el-button>
          <el-button size="mini" type="warning">提醒</el-button>
          <el-button size="mini" type="primary">设置</el-button>
          <el-button size="mini" type="default">历史归档</el-button>
          <el-button size="mini" type="primary">报表</el-button>
        </template>
      </page-tools>
      <table>
          <tr border="1px" align="center" cellpadding="0" cellspacing="0" class="tableInfo">
            <th width="50">序号</th>
            <th width="100">姓名</th>
            <th width="100">工号</th>
            <th width="200">部门</th>
            <th width="100">手机</th>    
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
  
</script>


