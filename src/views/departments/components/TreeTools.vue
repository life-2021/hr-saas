<template>
  <!-- layout行列布局 -->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容state -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>
          {{ treeNode.manager }}
        </el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <span>操作 <i class="el-icon-arrow-down"/></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
    <!-- 右侧内容end -->
  </el-row>
</template>

<script>
import { delDepartments } from "../../../api/departments";
export default {
  props: {
    treeNode: {
      require: true, 
      type: Object, //对象类型
    },
    isRoot: {
      //是否为根节点---控制组件的不同信息的展示
      default: false,
      type: Boolean,
    },
  },
  methods: {
    operateDepts(type) {
      if (type === "add") {
        // 添加子部门的操作
        this.$emit("addDepts", this.treeNode); // 为何传出treeNode 因为是添加子部门 需要当前部门的数据
      } else if (type === "edit") {
        //  编辑部门的操作
        this.$emit("editDepts", this.treeNode);
      } else {
        //  删除操作
        this.$confirm("确定要删除该部门吗")
          .then(() => {
            // 如果点击了确定就会进入then
            return delDepartments(this.treeNode.id); // 返回promise对象
          })
          .then(() => {
            //  如果删除成功了  就会进入这里
            // 后端数据变了，前端还没有变
            this.$emit("delDepts"); // 触发自定义事件
            this.$message.success("删除部门成功");
          });
      }
    },
  },
}
</script>

<style>
</style>