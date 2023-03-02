<template>
    <div>
        <div class="container">
            <div class="header">
                <div class="title">全公司</div>
                <div class="selector">
                    <el-date-picker v-model="checkedYear" type="year" placeholder="选择年">
                    </el-date-picker>
                </div>
            </div>
            <div class="body">
                <!-- 概述 -->
                <div class="brief">
                    <div @click="isHidden = !isHidden">
                        <i v-bind:class="[isHidden ? 'el-icon-arrow-right' : 'el-icon-arrow-down']"
                            style="font-size: 30px;"></i>
                    </div>
                    <div><span style="font-weight: 800; line-height: 2rem;">社保报表</span></div>
                    <div>
                        <span class="title">企业缴纳</span><br>
                        <span class="value">{{ this.socialMoney.enterprisePayment }}</span>
                    </div>
                    <div>
                        <span class="title">个人缴纳</span><br>
                        <span class="value">{{ this.socialMoney.personalPayment }}</span>
                    </div>
                    <div>
                        <span class="title">合计</span><br>
                        <span class="value">{{ this.socialMoney.total }}</span>
                    </div>
                </div>
                <el-divider v-bind:id="[isHidden ? 'lineDefault' : 'lineShow']"></el-divider>
                <!-- 表格 -->
                <div class="table" v-show="!isHidden">
                    <el-table :data="tableData" border style="width: 100%" height="250">
                        <el-table-column fixed prop="date" label="日期" width="150">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="province" label="省份" width="120">
                        </el-table-column>
                        <el-table-column prop="city" label="市区" width="120">
                        </el-table-column>
                        <el-table-column prop="address" label="地址" width="300">
                        </el-table-column>
                        <el-table-column prop="zip" label="邮编" width="120">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getSocialHistoricalAPI } from '@/api/social'
import moment from 'moment'
export default {
    data() {
        return {
            isHidden: true,//控制表格是否隐藏
            oldYear: Date,//防止没有数据回复年份数据
            checkedYear: '2020',//选择的年份
            socialMoney: {
                enterprisePayment: 0,//企业缴纳
                personalPayment: 0,//个人缴纳
                total: 0,//合计
            },
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-08',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-06',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }]
        }
    },
    methods: {
        // 获取指定年份的社保信息
        async getSocialHistoricalFn(year) {
            year ? year : year = 2020;
            let socialData = await getSocialHistoricalAPI(year)
            if (socialData.data.data.length === 0) {
                this.$message.error({ message: '该年份数据为空！！！' })
                this.checkedYear = moment(`${this.oldYear}`).format()
            } else {
                this.socialMoney.enterprisePayment = socialData.data.data[0].enterprisePayment
                this.socialMoney.personalPayment = socialData.data.data[0].personalPayment
                this.socialMoney.total = socialData.data.data[0].total
                // this.$message({ message: '获取年度表表成功', type: 'success' })
                this.oldYear = year;
            }

        },
        //展开
        testFn() {
            console.log('测试点1')
        }
    },
    watch: {
        checkedYear: {
            handler() {
                this.getSocialHistoricalFn(moment(this.checkedYear).format('YYYY'))
            }
        }
    },
    mounted() {
        this.getSocialHistoricalFn();
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

.body {
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

    .table {}
}
</style>