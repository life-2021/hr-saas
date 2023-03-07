<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template v-slot:after>                                 
          <el-button type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
        </template>
      </page-tools>
      <el-table border :data="list" row-key="id"> 
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <el-button v-if="(row.type === 1)" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible="showDialog" :title="formData.id ? '编辑权限' : '新增权限'" @close="btnCancel">
      <el-form ref="permForm" :model="formData" label-width="120px" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" style="width:90%" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getPermissionList, delPermission, addPermission, updatePermission, getPermissionDetail } from '../../api/permission'
import { tranListToTreeData } from '../../utils/index'
export default {
  data() {
    return {
      list: [], 
      showDialog: false, 
      formData: { 
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 
        pid: '', // 节点
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    // showText() {
    //   console.log(this.formData);
    //   return this.formData.id ? '编辑权限' : '新增权限'
    // }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const result = await getPermissionList()
      this.list = tranListToTreeData(result.data.data, '0')
    },
    btnOk() {
      this.$refs.permForm.validate().then(() => {
        if (this.formData.id) {
          return updatePermission(this.formData)
        }
        return addPermission(this.formData) // 新增接口
      }).then(() => {
        this.$message.success('操作成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 
        pid: '', // 节点
        enVisible: '0' // 开启
      }
      this.$refs.permForm.resetFields()
      this.showDialog = false
    },
    // 删除按钮
    delPermission(id) {
      this.$confirm('确定删除该选项吗').then(() => {
        return delPermission(id)
      }).then(() => {
        this.$message.success('删除成功')
        this.getPermissionList()// 重新拉取数据
      })
    },
    // 添加按钮
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    // 编辑按钮
    async editPermission(id) {
      let result = await getPermissionDetail(id)
      this.formData =result.data.data
      // console.log(this.formData);
      this.showDialog = true
    }
  }
}
</script>

  <style>
  </style>

