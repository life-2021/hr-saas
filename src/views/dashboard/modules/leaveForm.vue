<template>
    <div>
        <el-dialog title="申请" :visible.sync="applyFormVisible" :showClose="false" ref="from" :close-on-click-modal='false'>
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
                    <el-button type="primary" @click="applyFormCancel">提交申请</el-button>
                    <el-button @click="resetForm">重置</el-button>
                    <el-button @click="applyFormCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
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
        // 将表单状态设置为关闭

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
        font-size: 2rem;
        line-height: 30px;
    }
}
</style>
