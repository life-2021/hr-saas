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
                <socialTable v-for="item in months" :key="item.yearsMonth" :yearsMonthData=item></socialTable>
            </div>
        </div>

    </div>
</template>

<script>
import { getSocialHistoricalAPI } from '@/api/social'
import socialTable from '../components/socialTable.vue'
import moment from 'moment'

export default {
    data() {
        return {
            checkedYear: '2020',//选择的年份
            months: [],//获取到每年的月数据
        }
    },
    methods: {
        // 获取指定年份的社保简述信息
        async getSocialHistoricalFn(year) {
            year ? year : year = 2020;
            let res = await getSocialHistoricalAPI(year)
            if (res.data.data.length === 0) {
                this.$message.error({ message: '该年份数据为空！！！' })
            } else {
                this.months = res.data.data;
                // console.log(this.months)
            }

        },
    },
    watch: {
        checkedYear: {
            handler() {
                this.getSocialHistoricalFn(moment(this.checkedYear).format('YYYY'))
            }
        },
    },
    mounted() {
        this.getSocialHistoricalFn();
    },
    components: {
        socialTable,
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
</style>