<template>
    <div>
        <div class="from">
            
        </div>





        <div>
            用户ID（userId）：{{ this.userId }}<br><br>
            城市列表（CitysList）：{{ this.CitysList }}<br><br>
            用户基本信息（userIfon）：{{ this.userIfon }}<br><br>
            用户社保信息（userSocialIfon）：{{ this.userSocialIfon }}<br><br>
            城市社保缴费详情（getCitySocial）：{{ this.getCitySocial }}<br><br>
        </div>
    </div>
</template>

<script>
import { getCitysListAPI, getUserSocialAPI, getCitySocialAPI } from '@/api/social'
export default {
    data() {
        return {
            CitysList: [],//可选城市列表
            checkedCityId: '1084825908823904256',//选中的城市id
            getCitySocial: {},//城市社保缴费详情
            userId: '',//用户id
            userIfon: {},//用户基本信息
            userSocialIfon: {}//用户社保信息

        }
    },
    methods: {
        // 获取userId
        getUserIdFn() {
            this.userId = this.$route.query.userId;
        },
        // 获取城市列表
        async getCitysListFn() {
            let res = await getCitysListAPI();
            this.CitysList = res.data.data;
        },
        //获取用户社保信息
        async getUserSocialFn(id) {
            let res = await getUserSocialAPI(id);
            this.userIfon = res.data.data.user
            this.userSocialIfon = res.data.data.userSocialSecurity
        },
        //获取指定城市的社保缴费情况
        async getCitySocialFn(id) {
            let res = await getCitySocialAPI(id);
            this.getCitySocial = res.data.data
            console.log(res)
        }

    },
    mounted() {
        // 获取用户id
        this.getUserIdFn();
        // 获取城市列表
        this.getCitysListFn();
        // 获取用户基本数据，用户社保数据
        this.getUserSocialFn(this.userId);
        // 获取城市社保数据
        this.getCitySocialFn(this.checkedCityId)
    }
}
</script>

<style lang="scss" scoped></style>