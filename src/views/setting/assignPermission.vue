<template>
  <div>
    <!-- <el-tree :data="PermissionList" :props="{label:'name'}" /> -->
    <el-tree 
    ref="theTree"
    :data="PermissionList" 
    :props="{ label: 'name'}"
    show-checkbox
    default-expand-all
    check-strictly
    node-key="id"
    />

    <el-row class="footer" type="flex" justify="center">
            <el-col :span="6">
              <el-button size="small" @click="cancelButton">取消</el-button>
              <el-button type="primary" size="small" @click="setRolesBtn">确定</el-button>
            </el-col>
          </el-row>
  </div>
</template>

<script>
export default {
     name:'AssignPermission',
     props:{
        PermissionList:{
            type:Array,
            default: _ => []
        },
         permIds:{
            ype:Array,
            default:() => []
         },
        roleId:{
            type:[Number,String],
            required:true
        }
     },
     data(){
        return{}
     },
     watch:{
       permIds(){
            this.$refs.theTree.setCheckedKeys(this.permIds)
         }
     },
     created(){
        console.log(this.roleId)
     },
     
    methods:{
        //取消按钮
        cancelButton(){
            this.$emit('input',false)
        },
        //设置权限按钮
        setRolesBtn(){
            this.$emit('addperEV',this.$refs.theTree.getCheckedKeys())
            this.$emit('input',false)
        }
    }
}
</script>

<style lang="scss" scoped>
.footer{
    margin-top:30px;
}
</style>