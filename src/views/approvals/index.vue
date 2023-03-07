<template>
    <div>
        <div class="container topToolsContainer">
            <div class="message">
                <i class="el-icon-info" style="color: #409eff; font-size: 20px; margin-right: 10px;"></i>
                <span>当前审批中 0 本月审批通过 1 本月审批驳回 0</span>
            </div>
            <div class="linkBtn">
                <!-- <el-button type="primary" size="mini" @click="getApprovalList">测试按钮</el-button> -->
                <el-button type="primary" size="mini" @click="linkFn">流程设置</el-button>
            </div>
        </div>

        <!-- 表格 -->
        <div class="container tableContainer">
            <!-- 表格本体 -->
            <div class="table">
                <el-table :data="approvalList" stripe style="width: 98%"
                    :default-sort="{ prop: 'date', order: 'descending' }">
                    <!-- 索引列-->
                    <el-table-column type="index" :index="indexMethod" label="序号">
                    </el-table-column>
                    <!-- 审批类型 -->
                    <el-table-column prop="processName" label="审批类型" sortable>
                    </el-table-column>
                    <!-- 申请人 -->
                    <el-table-column prop="username" label="申请人" sortable>
                    </el-table-column>
                    <!-- 当前审批人 -->
                    <el-table-column prop="procCurrNodeUserName" label="当前审批人" sortable>
                    </el-table-column>
                    <!-- 审批发起时间 -->
                    <el-table-column prop="procData.startTime" label="审批发起时间" :formatter="formatDate" sortable>
                    </el-table-column>
                    <!-- 审批状态 -->
                    <el-table-column label="审批状态" sortable>
                        <template slot-scope="scope">
                            {{ scope.row.processState | formatType }}
                        </template>
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-view" size="mini"
                                @click="approvalDetailFn(scope.row.processId)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="tableControl">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                    layout="total, prev, pager, next, jumper" :total="approvalListTotal">
                </el-pagination>
            </div>
        </div>
        <!-- end:表格 -->
    </div>
</template>

<script>
import moment from 'moment';
import { getApprovalTableAPI } from '@/api/approvals'
export default {
    data() {
        return {
            approvalList: [],
            approvalListTotal: 0,//审批表单数据总数
            currentPage: 1,//当前页数
        }
    },
    methods: {
        // 表格索引列
        indexMethod(index) {
            return ++index;
        },
        // 表格排序
        formatter(row, column) {
            return row.address;
        },
        // 分页-第n页
        handleCurrentChange(val) {
            this.getSocialListFn({ page: val, pageSize: 10, total: 0 })
        },
        async getApprovalList(page, size) {
            page ? page : page = 1;
            size ? size : size = 10;
            let res = await getApprovalTableAPI(page, size);
            if (res.data.code === 10000) {
                this.$message({ message: '数据获取成功', type: 'success' })
                this.approvalListTotal = res.data.data.total
                this.approvalList = res.data.data.rows
                this.approvalList.forEach((item) => {
                    item.procData = JSON.parse(item.procData)
                    // console.log(item.procData)
                })
                // console.log(this.approvalList)
            }

        },
        formatDate(row) {
            return moment(row).format("YYYY-MM-DD")
        },
        // 跳转
        approvalDetailFn(processId) {
            // console.log(processId)
            this.$router.push({
                path: '/processDetail',
                query: {
                    processId,
                }
            }
            );
        },
        linkFn() {
            this.$router.push('/process');
        }

    },
    filters: {
        formatType(val) {
            if (val == 1) {
                return '审批中'
            } else if (val == 2) {
                return '审批通过'
            } else if (val == 3) {
                return '审批不通过'
            }
            else if (val == 4) {
                return '撤销'
            } else {
                return ''
            }
        }
    },
    mounted() {
        this.getApprovalList()
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 15px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0);
}

.topToolsContainer {
    div {
        display: inline-block;
    }

    .message {
        display: inline-block;
        padding: 5px 15px;
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        border-radius: 5px;
    }

    .linkBtn {
        position: absolute;
        right: 5%;
    }

}

.tableContainer {
    text-align: center;
    position: relative;

    .table {
        margin-bottom: 60px;
    }

    .tableControl {
        position: absolute;
        left: 50%;
        bottom: 30px;
        transform: translateX(-70%);

    }
}
</style>