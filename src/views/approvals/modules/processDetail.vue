<template>
    <div class="block container">
        <div class="body1">
            <h2>申请请假</h2>
            <div>
                <div class="xingx">
                    <div>
                        <img src="http://ihrm.itheima.net/static/img/img.0615818f.jpeg">
                    </div>
                    <div>
                        <h4>{{ DetailsList.username }}</h4>
                        <p>部门:{{ DetailsList.departmentName }}</p>
                        <span>入职时间:{{ DetailsList.timeOfEntry | dateFormat }}</span>
                    </div>
                </div>
                <el-divider></el-divider>
                <!-- 请假 -->
                <div class="ku" v-if="processName == '请假'">
                    <p><span>申请类型:|</span>&nbsp;&nbsp;{{ processName }}</p>
                    <p><span>请假类型:|</span>&nbsp;&nbsp;事假</p>
                    <p><span>申请单位:|</span>&nbsp;&nbsp;{{ DetaList.applyUnit }}</p>
                    <p><span>开始时间:|</span>&nbsp;&nbsp;{{ DetaList.startTime.substring(0, 10) }}</p>
                    <p><span>结束时间:|</span>&nbsp;&nbsp;{{ DetaList.endTime.substring(0, 10) }}</p>
                    <p><span>请假时长:|</span>&nbsp;&nbsp;{{ DetaList.holidayType }}</p>
                    <p><span>申请事由:|</span>&nbsp;&nbsp;{{ DetaList.reason }}</p>
                </div>
                <!-- 离职 -->
                <div class="ku" v-else-if="processName == '离职'">
                    <p><span>申请类型:|</span>&nbsp;&nbsp;{{ processName }}</p>
                    <p><span>期望离职时间:|</span>&nbsp;&nbsp;{{ DetaList.exceptTime.substring(0, 10) }}</p>
                    <p><span>离职原因:|</span>&nbsp;&nbsp;{{ DetaList.reason }}</p>
                </div>
                <!-- 加班 -->
                <div class="ku" v-else-if="processName == '加班'">
                    <p><span>补偿方式:|</span>&nbsp;&nbsp;调休</p>
                    <p><span>加班开始时间:|</span>&nbsp;&nbsp;{{ DetaList.start_time.substring(0, 10) }}</p>
                    <p><span>加班结束时间:|</span>&nbsp;&nbsp;{{ DetaList.end_time.substring(0, 10) }}</p>
                    <p><span>申请原因:|</span>&nbsp;&nbsp;{{ DetaList.reason }}</p>
                </div>

            </div>
        </div>
        <div class="body2">
            <h4>审批记录</h4>
            <el-divider></el-divider>
            <el-timeline v-model="reverse" size="large">
                <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.handleTime | dateFormat" :color="activity.color">
                    <span>{{ activity.handleUserName }}</span>
                    <span>{{ activity.handleOpinion }}</span>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import moment from "moment"
import { getprocessDetailAPI, getprocessDetailHistoryAPI } from '@/api/approvals'
export default {
    data() {
        return {
            reverse: true,
            activities: [],
            DetailsList: [],
            processName: '',
            DetaList: []
        };
    },
    methods: {
        async getprocessDetailFn() {
            let res = await getprocessDetailAPI(this.$route.query.processId)
            // console.log(res)
            this.DetailsList = res.data.data
            this.processName = res.data.data.processName
            this.DetaList = JSON.parse(res.data.data.procData)
        },
        async getprocessDetailHistoryFn() {
            let res = await getprocessDetailHistoryAPI(this.$route.query.processId)
            // console.log(res)
            this.activities = res.data.data
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
.block {
    display: flex;
    justify-content: space-between;
}

.body1 {
    width: 850px;
    height: 700px;
    padding: 30px 0px 0px 0px;
}

.body2 {
    width: 300px;
    height: 400px;
    padding: 30px 20px 0px 0px;
}

.ku {
    padding: 0 70px;
}

.ku p {
    margin: 30px 0;
}

.ku span {
    color: gray;
}

.xingx p {
    margin: 20px 0;
}

.xingx {
    display: flex;
}

img {
    width: 100px;
    height: 100px;
}

h2 {
    margin: 30px 0px;
}</style>