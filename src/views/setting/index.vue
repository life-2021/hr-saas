<template>
<div class="setting-container">
    <div class="app-container">
        <!-- 卡片组件 -->
   <el-card class="box-card">
        <!-- 使用 Tabs 组件完成标签页布局 -->
        <el-tabs v-model="activeName">
            <!-- 左边内容 -->
          <el-tab-pane label="角色管理" name="first" class="tab-pane">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRoleBtnFn"
              >新增角色</el-button>
            </el-row>

            <!-- 使用 Table 组件实现用户角色的渲染  表格绑定数据-->
             <el-table :data="rolesList" border style="width: 100%">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success" @click="setRoles(scope.row)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRoles(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRoles(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              :current-page="query.page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="query.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息">

            <!-- 右边内容 -->

            <!-- 提示警告内容 -->
            <el-alert
              title="您好！贵公司名称欢迎您的来访，贵公司经营范围，我们本着以诚为根，以信为本的经营方针，真诚为您服务，恭候您的莅临！"
              type="info"
              :show-icon="true"
              :closable="false"
            />
            <el-form :model="formData" label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-dialog
        :title="isEdit ? '编辑角色' : '新增角色'"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
        @close="closeRoleDialog"
      >
        <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>

        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="cancleRoles">取消</el-button>
            <el-button size="small" type="primary" @click="roleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>

 <!-- 分配权限弹层 -->
 <el-dialog title="分配权限" :visible.sync="dialogVisible" @close="perdialogCloseFn">
  <assign-permission
   v-model="dialogVisible" 
  :permission-list="PermissionList"
  :perm-ids="permIds"
  @addperEV="addpermissionFn"
   />
 </el-dialog>
      <!-- 分配权限弹层 -->
        <!-- <el-dialog title="分配权限" :visible="showPermDialog">
          <el-tree
            ref="permTree"
            :data="permData"
            :props="defaultProps"
            :show-checkbox="true"
            :check-strictly="true"
            :default-expand-all="true"
            :default-checked-keys="selectCheck"
            node-key="id"
          /> -->
          <!-- 确定 取消 -->
      <!-- <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
              <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
              <el-button size="small" @click="btnPermCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-dialog> -->
    </div>
</div>
</template>

<script>
import { getRolesAPI, getCompanyInfoAPI, addRoleAPI, getRoleIdAPI, updateRoleAPI, deleteRoleAPI, getRoleDetailAPI, assignPermAPI} from '@/api/setting'
import { mapGetters } from 'vuex'
import AssignPermission from './assignPermission.vue'
import { getPermissionListAPI } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
    export default {
      components:{
        AssignPermission
      },
           data() {
    return {
      activeName: 'first',
      query: {
        page: 1, // 当前页面
        pagesize: 10 // 页面显示的条数
      },
      rolesList: [], // 角色列表
      total: 0, // 角色数据总条数
      formData: {}, // 公司信息对象
      showDialog: false, // 控制弹框的隐藏和展示
      // 添加角色
      roleForm: {
        name: '',
        description: ''
      },
      // 添加角色验证
      roleRules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      isEdit: false, // 是否处于编辑状态
      dialogVisible:false,//显示或隐藏 分配权限点的弹窗
      permissioList:[],//所有权限点
      permIds:[],//此角色id(权限id)
      clickRoleId:''//分配时角色id
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    // 调用获取角色列表的方法
    this.getRolesList()
    // 调用获取公司信息的方法
    this.getCompanyInfo()
    //获取所有权限
    this.getPermissionList()
  },
  methods: {
    async getPermissionList(){
      const res = await getPermissionListAPI()
      // console.log(res)
      this.PermissionList=tranListToTreeData(res.data.data,'0')
    },
    // 获取角色列表
    async getRolesList() {
      // 发起请求
      const res = await getRolesAPI(this.query)
      // 根据返回的状态码进行业务处理
      if (!res.data.success) return this.$message.error(res.data.message)
      // 将返回的数据进行赋值
      this.rolesList = res.data.data.rows
      this.total = res.data.data.total
    },
    // 获取的公司的信息
    async getCompanyInfo() {
      const res = await getCompanyInfoAPI(this.companyId)
      if (!res.data.success) return this.$message.error(res.data.message)
      this.formData = res.data.data
    },
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.pagesize = newSize
      this.getRolesList()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getRolesList()
    },

    // 设置角色
    async setRoles(roleObj) {
      this.clickRoleId=roleObj.id
      this.dialogVisible=true
      const res = await getRoleDetailAPI(roleObj.id)
      this. permIds = res.data.data.permIds
      // this.total = res.data.data.total
      
    },

    // 编辑角色
    async editRoles(dataObj) {
      // 是否编辑状态
      this.isEdit = true
      // 调用接口，获取需要编辑的角色数据
      const res = await getRoleIdAPI(dataObj.id)
      if (!res.data.success) return this.$message.error(res.data.message)
      this.roleForm = res.data.data
      // 让弹框展示
      this.showDialog = true
    },

    // 删除角色
    async delRoles(dataObj) {
      // 判断当前数据的长度是否等于 1
      if (this.rolesList.length === 1) {
        this.query.page--
        // 如果是第一页的第一条
        if (this.query.page <= 0) {
          this.query.page = 1
        }
      }
      // 显示删除询问对话框
      const delRes = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 用户点击了取消，给用户进行提示
      if (delRes === 'cancel') return this.$message.info('您取消了删除')

      // 调用删除的 API
      const res = await deleteRoleAPI(dataObj.id)

      // 根据返回的状态码进行错误提示
      if (!res.data.success) return this.$message.error(res.data.message)
      // 删除成功后的提示
      this.$message.success(res.data.message)//g
      // 重新获取数据
      this.getRolesList()
    },

    // 角色弹框-> 确定按钮
    roleSubmit() {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          if (!this.isEdit) {
          // 调用新增角色的 API
            const res = await addRoleAPI(this.roleForm)
            // 根据状态码判断请求成功与否
            if (!res.data.success) return this.$message.error(res.data.message)
            // 添加成功，给用户进行提示
            this.$message.success(res.data.message)//g
          } else {
          // 调用编辑角色的 API
            const res = await updateRoleAPI(this.roleForm)
            // 根据状态码判断请求成功与否
            if (!res.data.success) return this.$message.error(res.data.message)
            // 编辑成功，给用户进行提示
            this.$message.success(res.data.message)//g
          }

          // 重新获取权限列表数据
          this.getRolesList()
          this.roleForm = {
            name: '',
            description: ''
          }
          this.$refs.roleForm.resetFields()
          // 隐藏弹框
          this.showDialog = false
        }
      })
    },

    // 角色弹框-> 取消按钮
    cancleRoles() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },

    // 新增角色->按钮点击事件
    addRoleBtnFn() {
      this.isEdit = false
      this.showDialog = true
    },

    // 关闭角色弹框
    closeRoleDialog() {
      this.$refs.roleForm.resetFields()
    },


//分配权限点弹窗关闭方法
perDialogCloseFn(){
  this.permIds=[]
},
async addpermissionFn(permIdsList){
    await assignPermAPI({
        id:this.clickRoleId,
        permIds:permIdsList
    })
    this.getRolesList()
}

    //分配权限
    // async assignPerm(id) {
    //   this.permData = tranListToTreeData(await getPermissionList(),'0')
    //   this.roleId = id
    //   // 回填数据
    //   const { permIds } = await deleteRoleAPI(id)
    //   this.selectCheck = permIds//当前角色权限赋值
    //   this.showPermDialog = true
    // },
    // async btnPermOK() {
    //   await assignPerm({
    //     permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId
    //   })
    //   this.$message.success('分配成功')
    //   this.showPermDialog = false
    // },
    // btnPermCancel() {
    //   this.showPermDialog = false
    // }
  }
    }
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 30px;
}

.tab-pane {
  padding: 20px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>