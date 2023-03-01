<template>
    <div>
        <el-dialog title="申请" :visible.sync="applyFormVisible" :showClose="false" ref="from" :close-on-click-modal='false'
            :close-on-press-escape="false">
            <el-form>
                <!-- 申请类型 -->
                <el-form-item label="申请类型：">
                    <el-select v-model="applyFormData.applyType">
                        <el-option label="加班" value="加班"></el-option>
                        <el-option label="离职" value="离职"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 加班表单 -->
                <div v-if="applyFormData.applyType === '加班'">
                    <el-form-item label="加班开始时间：">
                        <el-col :span="11">
                            <el-date-picker v-model="applyFormData.overtimeStart" type="datetime"
                                placeholder="选择开始日期时间"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="加班结束时间：">
                        <el-col :span="11">
                            <el-date-picker v-model="applyFormData.overtimeEnd" type="datetime"
                                placeholder="选择结束日期时间"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="补偿方式：">
                        <el-col style="width: 80px">
                            调休
                        </el-col>
                    </el-form-item>
                    <el-form-item label="加班原因">
                        <el-col style="width: 400px">
                            <el-input type="textarea" rows="4" placeholder="请输入内容" v-model="applyFormData.overtimeCause">
                            </el-input>
                        </el-col>
                    </el-form-item>
                </div>
                <!-- 离职表单 -->
                <div v-else>
                    <el-form-item label="离职时间：">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="applyFormData.departureTime">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="离职原因">
                        <el-col style="width: 400px">
                            <el-input type="textarea" rows="4" placeholder="请输入内容" v-model="applyFormData.departureCause">
                            </el-input>
                        </el-col>
                    </el-form-item>
                </div>
                <!-- 提交取消重置 -->
                <el-form-item>
                    <el-button type="primary" @click="applyFormSubmit">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                    <el-button @click="applyFormCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import moment, { months } from "moment"
import { startProcess } from '@/api/approvals';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            applyFormData: {
                applyType: '加班',//申请类型：加班 离职
                departureTime: '',//离职时间
                departureCause: '',//离职原因
                overtimeStart: '',//加班开始时间
                overtimeEnd: '',//加班结束时间
                overtimeCause: '',//加班原因

            },
            nullFrom: {
                applyType: '加班',//申请类型：加班 离职
                departureTime: '',//离职时间
                departureCause: '',//离职原因
                overtimeStart: '',//加班开始时间
                overtimeEnd: '',//加班结束时间
                overtimeCause: '',//加班原因
            },

        }

    },
    methods: {
        // 提交表单
        async applyFormSubmit() {
            let applyForm = {};
            if (this.applyFormData.applyType === '加班') {
                applyForm = {
                    userId: this.userInfo.userId,//申请人ID
                    username: this.userInfo.username,//申请人名称
                    procApplyTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),//申请时间
                    overtimeStart: moment(this.applyFormData.overtimeStart).format('YYYY-MM-DD HH:mm:ss'),//加班开始时间
                    overtimeEnd: moment(this.applyFormData.overtimeEnd).format('YYYY-MM-DD HH:mm:ss'),//加班结束时间
                    overtimeCause: this.applyFormData.overtimeCause,//加班原因
                }
                let res = await startProcess(applyForm);
                if (res.status === 200) {
                    if (res.data.code === 10000) {
                        this.applyFormCancel()
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        })
                    } else {
                        this.applyFormCancel()
                        this.$message.error(res.data.message)
                    }
                } else {
                    this.applyFormCancel()
                    this.$message.error("提交失败！")
                }
            } else if (this.applyFormData.applyType === '离职') {
                applyForm = {
                    userId: this.userInfo.userId,//申请人ID
                    username: this.userInfo.username,//申请人名称
                    procApplyTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),//表单提交时间
                    departureTime: moment(this.applyFormData.departureTime).format('YYYY-MM-DD'),//离职时间
                    departureCause: this.applyFormData.departureCause,//离职原因
                }
                let res = await startProcess(applyForm);
                if (res.status === 200) {
                    if (res.data.code === 10000) {
                        this.applyFormCancel()
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        })
                    } else {
                        this.applyFormCancel()
                        this.$message.error(res.data.message)
                    }
                } else {
                    this.applyFormCancel()
                    this.$message.error("提交失败！")
                }
            } else {
                this.applyFormCancel()
                this.$message.error("申请表单类型错误！")
            }

        },
        // 关闭表单
        applyFormCancel() {
            // 重置表单
            this.resetForm()
            // 修改状态
            this.$emit('applyFormCancel')
        },
        // 重置表单
        resetForm() {
            // 深拷贝
            this.applyFormData = JSON.parse(JSON.stringify(this.nullFrom));
        },
    },
    computed: {
        // 获取vuex中user模块中的token,userInfo
        ...mapState("user", {
            userInfo: (state) => state.userInfo,
        }),
    },
    props: {
        applyFormVisible: Boolean,
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
