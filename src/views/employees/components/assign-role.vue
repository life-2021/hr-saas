<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: null,
    },
    data() {
      return {
        list: [], //角色列表
        roleIds: [], //存储用户角色的id
      };
    },
    created() {
      this.getRoleList();
    },
    methods: {
      async getRoleList() {
        const {rows} = await this.$API.setting.getRoleList({
          page:1,
          pagesize:10,
        })
        this.list = rows;
        console.log(rows)
      },
    },
  },
};
</script>