<template>
    <div>
        <el-dialog title="请假" :visible.sync="leaveFormVisible" :showClose="false" ref="from" :close-on-click-modal='false'
            :close-on-press-escape="false">
            <el-form>
                <!-- 假期类型 -->
                <el-form-item label="假期类型：">
                    <el-select v-model="leaveFormData.leaveType">
                        <el-option label="请假" value="请假"></el-option>
                        <el-option label="调休" value="调休"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 申请方式 -->
                <el-form-item label="申请方式：">
                    <el-col style="width: 80px">
                        按天
                    </el-col>
                </el-form-item>
                <!-- 开始时间 -->
                <el-form-item label="开始时间：">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="leaveFormData.leaveStart">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <!-- 结束时间 -->
                <el-form-item label="结束时间：">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="leaveFormData.leaveEnd">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <!-- 申请天数 -->
                <el-form-item label="申请天数：">
                    <el-col :span="6">
                        <el-input v-model="leaveFormData.leaveDays" placeholder="请输入内容"></el-input>
                    </el-col>
                </el-form-item>
                <!-- 理由 -->
                <el-form-item label="申请原因">
                    <el-col style="width: 400px">
                        <el-input type="textarea" rows="4" placeholder="请输入内容" v-model="leaveFormData.leaveCause">
                        </el-input>
                    </el-col>
                </el-form-item>
                <!-- 提交取消重置 -->
                <el-form-item>
                    <el-button type="primary" @click="leaveFormSubmit">提交申请</el-button>
                    <el-button @click="resetForm">重置</el-button>
                    <el-button @click="leaveFormCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { startProcess } from '@/api/approvals';
export default {
    data() {
        return {
            leaveFormData: {
                leaveType: '',//假期类型
                leaveStart: '',//开始时间
                leaveEnd: '',//结束时间
                leaveDays: '',//申请天数
                leaveCause: '',//原因
            },
            nullFrom: {
                leaveType: '',//假期类型
                leaveStart: '',//开始时间
                leaveEnd: '',//结束时间
                leaveDays: '',//申请天数
                leaveCause: '',//原因
            },

        }

    },
    methods: {
        // 提交表单
        async leaveFormSubmit() {
            let leaveForm = {};
            if (this.leaveFormData.leaveType === '请假' || this.leaveFormData.leaveType === '调休') {
                leaveForm = {
                    leaveType: this.leaveFormData.leaveType,//假期类型
                    leaveStart: this.leaveFormData.leaveStart,//开始时间
                    leaveEnd: this.leaveFormData.leaveEnd,//结束时间
                    leaveDays: this.leaveFormData.leaveDays,//申请天数
                    leaveCause: this.leaveFormData.leaveCause,//原因
                }
                let res = await startProcess(leaveForm);
                if (res.status === 200) {
                    this.leaveFormCancel()
                    this.$message({
                        message: '提交成功！',
                        type: 'success'
                    })
                } else {
                    this.leaveFormCancel()
                    this.$message.error("提交失败！")
                }
            } else {
                this.leaveFormCancel()
                this.$message.error("假期类型错误！")
            }
        },
        // 将表单状态设置为关闭
        leaveFormCancel() {
            // 重置表单
            this.resetForm()
            // 修改状态
            this.$emit('leaveFormCancel')
        },
        // 重置表单
        resetForm() {
            // 深拷贝
            this.leaveFormData = JSON.parse(JSON.stringify(this.nullFrom));
        },
    },
    props: {
        leaveFormVisible: Boolean,
    }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
    background-color: #66b1ff;
    height: 40px;

    .el-dialog__title {
        color: #fff;
        font-size: 2rem;
        line-height: 30px;
    }
}
</style>
