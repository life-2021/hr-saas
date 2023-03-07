<template>
    <div>
        <!-- 概述 -->
        <div class="brief">
            <div @click="isHidden = !isHidden">
                <i v-bind:class="[isHidden ? 'el-icon-arrow-right' : 'el-icon-arrow-down']" style="font-size: 30px;"></i>
            </div>
            <div>
                <span class="title">社保报表</span><br>
                <span class="value">时间:{{ this.yearsMonthData.yearsMonth }}</span>
            </div>
            <div>
                <span class="title">企业缴纳</span><br>
                <span class="value">{{ this.yearsMonthData.enterprisePayment }}</span>
            </div>
            <div>
                <span class="title">个人缴纳</span><br>
                <span class="value">{{ this.yearsMonthData.personalPayment }}</span>
            </div>
            <div>
                <span class="title">合计</span><br>
                <span class="value">{{ this.yearsMonthData.total }}</span>
            </div>
            <div>
                <el-tooltip effect="dark" :disabled="isExport" content="数据未加载！" placement="right">
                    <div style="margin-top: -15%;">
                        <el-button type="primary" icon="el-icon-printer" @click="exportExcel"
                            :disabled="!isExport">导出</el-button>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <el-divider v-bind:id="[isHidden ? 'lineDefault' : 'lineShow']"></el-divider>
        <!-- 表格 -->
        <div class="table" v-show="!isHidden">
            <el-table :data="tableData" :id='getIdFn(this.checkedYearsMonth)' ref="exportTableRef" border style="width: 84vw" height="550">
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
    </div>
</template>

<script>
import moment from 'moment'
import { getSocialHistoricalTableAPI } from '@/api/social'
import * as XLSX from 'xlsx'
import FileSaver from "file-saver";

export default {
    data() {
        return {
            isHidden: true,//是否隐藏表单
            isExport: false,//是否能导出
            checkedYearsMonth: this.yearsMonthData.yearsMonth,//月份
            tableData: []
        }
    },
    props: {
        yearsMonthData: Object,
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
        /*日期处理*/
        dateFormat(row, column) {
            let date = row[column.property];
            if (date === undefined) {
                return ''
            }
            return moment(date).format("YYYY-MM-DD")
        },
        // 
        getIdFn(date) {
            return 'table' + date;
        },
        // 导出表格功能
        exportExcel() {
            var xlsxParam = { raw: true };
            let fix = document.querySelector('.el-table__fixed');
            let wb;
            if (fix) { //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
                // console.log(document.querySelector(`#table${this.checkedYearsMonth}`))
                wb = XLSX.utils.table_to_book(document.querySelector(`#table${this.checkedYearsMonth}`).removeChild(fix), xlsxParam);
                document.querySelector(`#table${this.checkedYearsMonth}`).appendChild(fix);
            } else {
                wb = XLSX.utils.table_to_book(document.querySelector(`#table${this.checkedYearsMonth}`));
            }
            let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${this.checkedYearsMonth}报表.xlsx`)
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout)
            }
            this.$message({ message: `${this.checkedYearsMonth}报表导出成功！即将开始下载！`, type: 'success' })
            return wbout
        },
        // 获取指定年份的社保表格信息 
        async getSocialHistoricalTableFn(YearsMonth) {
            let res = await getSocialHistoricalTableAPI(YearsMonth)
            this.tableData = res.data.data
            this.$message({ message: `${YearsMonth}报表数据获取成功`, type: 'success' })
            this.isExport = !this.isExport;
        },

    },
    watch: {
    },
    mounted() {
        this.getSocialHistoricalTableFn(this.checkedYearsMonth)
    }
}
</script>

<style lang="scss" scoped>
.brief {
    div {
        margin-top: 20px;
        padding: 20px 40px;
        border-right: 1px solid #cccccc;
        display: inline-block;
        text-align: center;
        height: 30px;
        vertical-align: middle;

        &:last-of-type {
            border-right: none;
        }
    }

    .title {
        color: #cccccc;
    }

    .value {
        font-size: 1.2rem;
        line-height: 2rem;
    }
}

.fold {
    border-bottom: 4px solid #cccccc;
}

#lineDefault {
    height: 4px;
    border-radius: 2px;
    background-color: #cccccc;
}

#lineShow {
    height: 4px;
    border-radius: 2px;
    background-color: #30b08f;

}

.table {
    ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
        overflow: auto !important;
    }

    ::v-deep .el-table__fixed-right-patch {
        background-color: #f5f7fa !important;
    }
}
</style>