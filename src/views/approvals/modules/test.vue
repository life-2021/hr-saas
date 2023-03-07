<template>
    <div class="container">
        <div class="detail">
            <h2>请假申请</h2>
        </div>
        <div class="history"></div>
    </div>
</template>

<script>
import moment from "moment"
import { getprocessDetailAPI, getprocessDetailHistoryAPI } from '@/api/approvals'
export default {
    data() {
        return {
            detailData: {}, //申请详细数据
            historyData:{}, //历史记录
        };
    },
    methods: {
        async getprocessDetailFn() {
            let res = await getprocessDetailAPI(this.$route.query.processId)
            this.detailData = res.data.data;
            console.log(res.data.data)
        },
        async getprocessDetailHistoryFn() {
            let res = await getprocessDetailHistoryAPI(this.$route.query.processId)
            console.log(res.data.data)
        },
    },
    mounted() {
        this.getprocessDetailFn()
        this.getprocessDetailHistoryFn()
    },
    filters: {
        dateFormat(value) {
            return moment(value).format('YYYY-MM-DD')
        }
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

</style>