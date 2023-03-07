<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card"> 
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <TreeTools slot-scope="{data}" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <AddDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '../../api/departments'
import { tranListToTreeData } from '../../utils/index'
import AddDept from './components/add-dept' 
export default {
  components: {
    TreeTools, AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name', 
        children: 'children' 
      },
      showDialog: false, // 默认不显示弹层
      node: null // 记录当前点击的node节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.data.data.companyName, manager: '负责人', id: '' } 
      this.departs = tranListToTreeData(result.data.data.depts, '')
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      this.showDialog = true
      this.node=node
      // console.log(this.node);
      this.$refs.addDept.getDepartDetail(node.id) 
    }

  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>

