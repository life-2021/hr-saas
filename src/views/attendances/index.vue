<template>
  <div v-loading="loading" class="dashboard-container">
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
    </div>
    </div>
</template>