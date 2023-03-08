<template>
    <!-- <div class="container">
            <button @click="getAttendancesListFn()">测试按钮</button>
        </div> -->
    <!-- 表格 -->
    <div class="container tableContainer">
        <!-- 表格本体 -->
        <div class="table">
            <!-- <el-table :data="tableData" stripe style="width: 95%" :default-sort="{ prop: 'date', order: 'descending' }"> -->
            <!-- 索引列-->
            <!-- <el-table-column type="index" :index="indexMethod" label="序号" width="70">
                </el-table-column> -->
            <!-- 姓名 -->
            <!-- <el-table-column prop="username" label="姓名" width="80" sortable>
                </el-table-column> -->
            <!-- 工号 -->
            <!-- <el-table-column prop="workNumber" label="工号" width="80" sortable>
                </el-table-column> -->
            <!-- 部门 -->
            <!-- <el-table-column prop="departmentName" label="部门" width="80" sortable>
                </el-table-column> -->
            <!-- 手机 -->
            <!-- <el-table-column prop="mobile" label="手机" width="120" sortable>
                </el-table-column> -->
            <!-- 考勤 -->
            <!-- <el-table-column prop="attendanceRecord[0].adtStatu" label="考勤" width="120" sortable>
                </el-table-column> -->
            <!-- </el-table> -->
            <table>
                <thead>
                    <tr>
                        <td style="minwidth: 600px;">序号</td>
                        <td>姓名</td>
                        <td>工号</td>
                        <td>部门</td>
                        <td>手机</td>
                        <td v-for="(item, index) in tableData[0].attendanceRecord" :key="index">{{ monthOfReport
                        }}/{{ ++index }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td>{{ ++index }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item.workNumber }}</td>
                        <td>{{ item.departmentName }}</td>
                        <td>{{ item.mobile }}</td>
                        <td v-for="(item2) in item.attendanceRecord" :key="item2.day" @click="testFn(item2)">{{
                            item2.adtStatu |
                            attendancesTypeFn
                        }}</td>
                    </tr>
                    <el-dialog title="考勤状态" :visible.sync="dialogFormVisible">
                            <el-radio v-model="radio" label="1">正常</el-radio>
                            <el-radio v-model="radio" label="2">旷工</el-radio>
                            <el-radio v-model="radio" label="3">迟到</el-radio>
                            <el-radio v-model="radio" label="4">早退</el-radio>
                            <el-radio v-model="radio" label="5">外出</el-radio>
                            <el-radio v-model="radio" label="6">出差</el-radio>
                            <el-radio v-model="radio" label="7">年假</el-radio>
                            <el-radio v-model="radio" label="8">事假</el-radio><br>
                            <el-radio v-model="radio" label="9">病假</el-radio>
                            <el-radio v-model="radio" label="10">婚假</el-radio>
                            <el-radio v-model="radio" label="11">丧假</el-radio>
                            <el-radio v-model="radio" label="12">产假</el-radio>
                            <el-radio v-model="radio" label="13">奖励产假</el-radio>
                            <el-radio v-model="radio" label="14">陪产假</el-radio>
                            <el-radio v-model="radio" label="15">探亲假</el-radio>
                            <el-radio v-model="radio" label="16">工伤假</el-radio><br>
                            <el-radio v-model="radio" label="17">调休</el-radio>
                            <el-radio v-model="radio" label="18">产检假</el-radio>
                            <el-radio v-model="radio" label="19">流产假</el-radio>
                            <el-radio v-model="radio" label="20">长期病假</el-radio>
                            <el-radio v-model="radio" label="21">测试架</el-radio>
                            <el-radio v-model="radio" label="22">补签</el-radio>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                        </div>
                    </el-dialog>
                </tbody>
            </table>
        </div>
        <!-- 分页 -->
        <div class="tableControl">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                layout="total, prev, pager, next, jumper" :total="TableTotal">
            </el-pagination>
        </div>
    </div>
    <!-- end:表格 -->
</template>

<script>
import { getAttendancesList } from '@/api/attendances'
export default {
    data() {
        return {
            tableData: [],//考勤表数据
            monthOfReport: '',//当前表格月份
            TableTotal: 0,//社保表单数据总数
            currentPage: 1,//当前页数
            dialogFormVisible: false,//表单可见
            radio: '1'//表单数据
        }
    },
    methods: {
        // 获取考勤表格数据
        async getAttendancesListFn(data) {
            data ? data : data = { page: 1, pagesize: 10, total: 0 };
            let res = await getAttendancesList(data)
            // console.log(res.data.data.data.rows)
            this.monthOfReport = res.data.data.monthOfReport;
            this.TableTotal = res.data.data.data.total;
            this.tableData = res.data.data.data.rows;
            console.log(this.tableData);
        },
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
            this.getAttendancesListFn({ page: val, pageSize: 10, total: this.TableTotal })
        },
        // 点击修改考勤状态
        testFn(data) {
            this.dialogFormVisible = !this.dialogFormVisible;
            console.log(data)
        }
    },
    filters: {
        attendancesTypeFn(type) {
            switch (type) {
                case 1: {
                    return '正常';
                };
                case 2: {
                    return '旷工';
                };
                case 3: {
                    return '迟到';
                }
                case 4: {
                    return '早退';
                }
                case 5: {
                    return '外出';
                }
                case 6: {
                    return '出差';
                }
                case 7: {
                    return '年假';
                }
                case 8: {
                    return '事假';
                }
                case 9: {
                    return '病假';
                }
                case 10: {
                    return '婚假';
                }
                case 11: {
                    return '丧假';
                }
                case 12: {
                    return '产假';
                }
                case 13: {
                    return '奖励产假';
                }
                case 14: {
                    return '陪产假';
                }
                case 15: {
                    return '探亲假 ';
                }
                case 16: {
                    return '工伤假';
                }
                case 17: {
                    return '调休';
                }
                case 18: {
                    return '产检假';
                }
                case 19: {
                    return '流产假';
                }
                case 20: {
                    return '长期病假';
                }
                case 21: {
                    return '测试架 ';
                }
                case 22: {
                    return '补签';
                }
            }
        }
    },
    mounted() {
        this.getAttendancesListFn()
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

.tableContainer {
    text-align: center;
    position: relative;

    .table {
        margin-bottom: 60px;
        width: 85.8vw;
        height: 79.5vh;
        overflow: scroll;

        table {
            border-collapse: collapse;

            td {
                border: 1px solid #ccc;
                padding: 10px 20px;
            }
        }
    }

    .tableControl {
        position: absolute;
        left: 50%;
        bottom: 30px;
        transform: translateX(-70%);

    }
}
</style>