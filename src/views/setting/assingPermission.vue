<template>
  <div>
    <div>分配权限功能</div>
    <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
              <el-button size="small" @click="cancelButton">取消</el-button>
              <el-button type="primary" size="small" @click="setRolesBtn">确定</el-button>
            </el-col>
          </el-row>
  </div>
</template>

<script>
export default {
     name:'AssingPermission',
     props:{
        PermissionList:{
            type:Array,
            default:_=>[]
        },
        roleId:{
            type:[Number,String],
            required:true
        }
     },
     data(){
        return{}
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
        setrolesBtn(){
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