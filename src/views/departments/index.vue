<template>
  <div 
    class="dashboard-container"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <TreeTools :treeNode="company" :isRoot="true" @addDepts="addDepts" />
        <!-- 树形控件 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
            <TreeTools
              slot-scope="{data}"
              :treeNode="data"             
              @delDepts="getDepartments"
              @addDepts="addDepts"
              @editDepts="editDepts"
            />
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹窗层 -->
        <AddDept
          ref="addDept"
          :show-dialog.sync="showDialog"
          :treeNode="node"
          @addDepts="getDepartments"
        />
  </div>
</template>

<script>
import TreeTools from "../departments/components/TreeTools.vue";
import AddDept from "../departments/components/AddDept.vue";
import { getDepartments } from "../../api/departments";
import { tranListToTreeData } from "../../utils/index";
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      departs: [], // 存储组织架构的部门数据
      company: {},
      defaultProps: {
        children: "children",
        label: "name",
      }, // 树形控件的属性
      showDialog: false, //控制Dialog的显示与隐藏
      node:null, // 记录当前点击的部门
      // loading:false
    };
  },
  created() {
    this.getDepartments(); // 调用获取部门列表的方法
  },
  methods: {
    // handleNodeClick(data) {
    //   console.log(data);
    // },
    // clickScope(scope) {
    //   console.log(scope);
    // },
    async getDepartments() {
      // this.loading = true;
      const result = await getDepartments();
      this.company = { name:result.data.data.companyName, manager: "负责人" };
      this.departs = tranListToTreeData(result.data.data.depts, "");
      console.log(result.data.data);
      // this.loading = false;
    },
    // 添加部门
    addDepts(node) {
      this.showDialog = true; // 显示弹层
      this.node = node;    
    },
    // 编辑
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true;
      this.node = node; // 赋值操作的节点
      this.$refs.addDept.getDepartDetail(node.id); // 直接调用子组件中的方法 传入一个id
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 120px;
  font-size: 14px;

}
</style>