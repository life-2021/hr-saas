<template>
    <div>
        <div class="container">
            <div class="header">
                <div class="title">{{ this.Month }}社保报表</div>
            </div>
            <div class="table">
                <el-table :data="tableData" id="socialTable" ref="exportTableRef" border style="width: 85vw" height="72vh">
                    <!-- 索引列-->
                    <el-table-column type="index" :index="indexMethod" fixed label="序号" width="70">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="timeOfEntry" label="入职时间" width="120" :formatter="dateFormat">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" width="120">
                    </el-table-column>
                    <el-table-column prop="userId" label="员工ID" width="200">
                    </el-table-column>
                    <el-table-column prop="firstLevelDepartment" label="一级部门" width="120">
                    </el-table-column>
                    <el-table-column prop="idNumber" label="身份证号码" width="220">
                    </el-table-column>
                    <el-table-column prop="participatingInTheCity" label="社保城市" width="120">
                    </el-table-column>
                    <el-table-column prop="socialSecurityMonth" label="社保月份" width="120">
                    </el-table-column>
                    <el-table-column prop="socialSecurityEnterprise" label="公司社保" width="120">
                    </el-table-column>
                    <el-table-column prop="socialSecurityIndividual" label="个人社保" width="120">
                    </el-table-column>
                    <el-table-column prop="socialSecurity" label="社保合计" width="120">
                    </el-table-column>
                    <el-table-column prop="socialSecurityNotes" label="社保备注" width="120">
                    </el-table-column>
                    <el-table-column prop="providentFundCity" label="公积金城市" width="120">
                    </el-table-column>
                    <el-table-column prop="providentFundMonth" label="公积金月份" width="120">
                    </el-table-column>
                    <el-table-column prop="providentFundNotes" label="公积金备注" width="120">
                    </el-table-column>
                </el-table>
            </div>
            <div class="toolbar">
                <el-button type="primary" icon="el-icon-printer" @click="exportExcel" :disabled="!isExport">导出</el-button>
                <el-button type="danger" icon="el-icon-upload2" @click="submitFn">归档</el-button>
                <el-button icon="el-icon-d-arrow-left" @click="backFn">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import * as XLSX from 'xlsx'
import FileSaver from "file-saver";
import { getMonthTableAPI, submitMonthTableAPI } from '@/api/social'

export default {

    data() {
        return {
            isExport: false,//是否能导出
            Month: '',//当前月份
            tableData: []//表格数据
        }
    },
    methods: {
        // 获取月份
        getMonth() {
            this.Month = this.$route.query.Month
        },
        // 表格索引列
        indexMethod(index) {
            return ++index;
        },
        // 表格排序
        formatter(row, column) {
            return row.address;
        },
        /*日期处理*/
        dateFormat(row, column) {
            let date = row[column.property];
            if (date === undefined) {
                return ''
            }
            return moment(date).format("YYYY-MM-DD")
        },
        // 导出表格功能
        exportExcel() {
            var xlsxParam = { raw: true };
            let fix = document.querySelector('.el-table__fixed');
            let wb;
            if (fix) { //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
                wb = XLSX.utils.table_to_book(document.querySelector('#socialTable').removeChild(fix), xlsxParam);
                document.querySelector('#socialTable').appendChild(fix);
            } else {
                wb = XLSX.utils.table_to_book(document.querySelector('#socialTable'));
            }
            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${this.Month}报表.xlsx`)
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout)
            }
            this.$message({ message: '表格导出成功！（有延迟请稍等)', type: 'success' })
            return wbout
        },
        // 获取当前月份的社保表格信息 
        async getMonthTableFn() {
            let res = await getMonthTableAPI(this.Month)
            this.tableData = res.data.data
            this.$message({ message: '数据获取成功', type: 'success' })
            this.isExport = !this.isExport;
        },
        // 归档
        async submitFn() {
            let res = await submitMonthTableAPI();
            console.log(res)
            if (res.data.code === 10000) {
                 this.$message({ message: '数据归档成功！', type: 'success' })
            }
        },
        // 链接
        backFn() {
             this.$router.back();
        }
    },
    mounted() {
        this.getMonth();
        this.getMonthTableFn();
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

.header {
    border-bottom: 1px solid #f0f0f0;
    position: relative;

    div {
        display: inline-block;
    }

    .title {
        font-size: 1.1rem;
        font-weight: bold;
        color: #409eff;
        margin-left: 10px;
        padding: 10px 20px;
        border-bottom: 2px solid #409eff;
    }

    .selector {
        position: absolute;
        right: 30px;
    }
}
.table{
    margin: 20px auto;
}
</style>