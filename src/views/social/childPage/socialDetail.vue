<template>
    <div class="container">
        <!-- 头部信息 -->
        <div class="header">
            <!-- 头像 -->
            <div class="headPhoto">
                <img :src="userIfon.staffPhoto ? userIfon.staffPhoto : headPhotoUrl" alt="">
            </div>
            <!-- 内容 -->
            <div class="content">
                <span style="font-weight: 800; font-size: 1.4rem;">{{ this.userIfon.username }}</span>
                <span v-if="this.userIfon.inServiceStatus === 1" class="exist">在职</span>
                <span v-else-if="this.userIfon.inServiceStatus === 0" class="leave">离职</span>
                <br>
                <span>最新工资基数：NULL</span>
                <span>入职时间：{{ this.userIfon.timeOfEntry | dateFilter }}</span>
                <span>联系电话：{{ this.userIfon.mobile }}</span>
                <br>
                <span>
                    不缴纳本月社保：
                    <el-switch v-model="formData.enterprisesPaySocialSecurityThisMonth" active-color="#13ce66"
                        inactive-color="#ff4949" active-value="0" inactive-value="1" @change="getChangTime(0)">
                    </el-switch>
                </span>
                <span>
                    不缴纳本月公积金：
                    <el-switch v-model="formData.enterprisesPayTheProvidentFundThisMonth" active-color="#13ce66"
                        inactive-color="#ff4949" active-value="0" inactive-value="1" @change="getChangTime(1)">
                    </el-switch>
                </span>
            </div>
        </div>
        <!-- 表单本体 -->
        <div class="body">
            <el-form :model="formData" label-width="100px">
                <el-form-item label="参保城市">
                    <el-select v-model="formData.participatingInTheCityId">
                        <el-option v-for="item in citysList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="社保类型">
                    <el-select v-model="formData.socialSecurityType">
                        <el-option label="首次开户" :value="1" />
                        <el-option label="非首次开户" :value="2" />
                    </el-select>
                </el-form-item>

                <el-form-item label="户籍类型">
                    <el-select v-model="formData.householdRegistrationType" @change="getHouseholdRegistrationFn">
                        <el-option label="本市城镇" :value="1" />
                        <el-option label="本市农村" :value="2" />
                        <el-option label="外阜城镇" :value="3" />
                        <el-option label="外阜农村" :value="4" />
                    </el-select>
                </el-form-item>


                <el-form-item label="社保基数">
                    <el-input v-model="formData.socialSecurityBase" style="width: 38%" />（基数范围是3387 ~ 25401）
                </el-form-item>

                <el-form-item label="工伤比例">
                    <el-input v-model="formData.industrialInjuryRatio" style="width: 38%" />（比例范围是0.2％ ~
                    3％，推荐0.2％）
                </el-form-item>

                <el-form-item label="社保缴纳">
                    <el-form-item label="个人" label-width="74px" style="display: inline-block">
                        <el-input value="0" style="width: 100%" placeholder="个人" inline="true" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="公司" label-width="74px" style="display: inline-block">
                        <el-input value="0" style="width: 100%" placeholder="企业" size="small" inline="true"
                            :disabled="true" />
                    </el-form-item>
                </el-form-item>

                <el-table :data="getCitySocial">

                    <el-table-column label="缴费项目" prop="name"></el-table-column>

                    <el-table-column label="企业基数">
                        <template slot-scope="paymentItem">
                            <span v-show="paymentItem.row.switchCompany">{{ formData.socialSecurityBase }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="企业比例">
                        <template slot-scope="paymentItem">
                            <span v-show="paymentItem.row.switchCompany">{{ paymentItem.row.scaleCompany }}%</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="企业缴纳">
                        <template slot-scope="paymentItem">
                            <el-input v-show="paymentItem.row.switchCompany" :disabled="true"
                                :value='(formData.socialSecurityBase * paymentItem.row.scaleCompany / 100).toFixed(2)' />
                        </template>
                    </el-table-column>

                    <el-table-column label="个人基数">
                        <template slot-scope="paymentItem">
                            <span v-show="paymentItem.row.switchPersonal"></span>
                        </template>
                    </el-table-column>

                    <el-table-column label="个人比例">
                        <template slot-scope="paymentItem">
                            <span v-show="paymentItem.row.switchPersonal">{{ paymentItem.row.scalePersonal }}%</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="个人缴纳">
                        <template slot-scope="paymentItem">
                            <el-input v-show="paymentItem.row.switchPersonal" :disabled="true"
                                :value="(formData.socialSecurityBase * paymentItem.row.scalePersonal / 100).toFixed(2)" />
                        </template>
                    </el-table-column>

                </el-table>

                <el-form-item label="社保备注" style="margin-top: 20px;">
                    <el-input v-model="formData.socialSecurityNotes" type="textarea" :rows="2" placeholder="1-300字符"
                        maxlength="300" style="width: 38%" show-word-limit />
                </el-form-item>

                <el-form-item label="公积金城市">
                    <el-select v-model="formData.providentFundCityId">
                        <el-option v-for="item in citysList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="公积金基数">
                    <el-input v-model="formData.providentFundBase" style="width: 38%" />（基数范围是2273 ~ 25401）
                </el-form-item>

                <el-form-item label="企业比例">
                    <el-input v-model="formData.enterpriseProportion" style="width: 38%" placeholder="12" />
                    <span>（比例范围是5％ ~ 12％，推荐12％ ）</span>
                </el-form-item>

                <el-form-item label="个人比例">
                    <el-input v-model="formData.personalProportion" style="width: 38%" placeholder="12" />
                    <span>（比例范围是5％ ~ 12％，推荐12％ ）</span>
                </el-form-item>

                <el-form-item label="公积金缴纳">
                    <el-form-item label="个人" label-width="50px" style="display: inline-block">
                        <el-input v-model="personalProvidentFundPayment" style="width: 100%" placeholder="个人"
                            inline="true" />
                    </el-form-item>
                    <el-form-item label="公司" label-width="50px" style="display: inline-block">
                        <el-input v-model="enterpriseProvidentFundPayment" style="width: 100%" placeholder="企业"
                            inline="true" />
                    </el-form-item>
                    <el-form-item style="display: inline-block">
                        <span>（为自动测算结果，可手动调整）</span>
                    </el-form-item>
                </el-form-item>

                <el-form-item label="公积金备注">
                    <el-input v-model="formData.providentFundNotes" type="textarea" :rows="2" placeholder="1-300字符"
                        style="width: 38%" maxlength="300" show-word-limit />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitFn">保存更新</el-button>
                    <el-button @click="backFn">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { getCitysListAPI, getUserSocialAPI, getCitySocialAPI, submitUserSocialAPI } from '@/api/social'
export default {
    data() {
        return {
            headPhotoUrl: require("../../../assets/common/img.jpeg"),
            citysList: [], //城市列表
            checkedCityId: "",//选中城市的id  1084825908823904256
            getCitySocial: [],//城市社保缴费详情
            userId: "",
            userIfon: {},
            userSocialIfon: {},

            formData: {
                userId: null,//用户id
                enterprisesPaySocialSecurityThisMonth: null,//本月社保缴纳状态
                enterprisesPayTheProvidentFundThisMonth: null,//本月公积金缴纳状态
                participatingInTheCityId: null,//参保城市
                participatingInTheCity: null,//参保城市
                socialSecurityType: null,//社保类型
                householdRegistrationType: null,//户籍类型
                householdRegistration: null,//户籍类型
                socialSecurityBase: null,//社保基数
                industrialInjuryRatio: null,//工伤比例
                socialSecurityNotes: null,//社保备注
                providentFundCityId: null,//公积金城市
                providentFundCity: null,//公积金城市
                providentFundBase: null,//公积金基数
                enterpriseProportion: null,//企业比例
                personalProportion: null,//个人比例
                enterpriseProvidentFundPayment: null,//公积金-公司
                personalProvidentFundPayment: null,//公积金-个人
                providentFundNotes: null,//公积金备注
                lastModifyTime: null,//最后修改时间
                socialSecuritySwitchUpdateTime: null,//社保是否缴纳变更时间
                providentFundSwitchUpdateTime: null,//公积金是否缴纳变更时间
            }
        };
    },
    methods: {
        // 获取userId
        getUserIdFn() {
            this.userId = this.$route.query.userId;
        },
        // 获取城市列表
        async getCitysListFn() {
            let res = await getCitysListAPI();
            this.citysList = res.data.data;
        },

        // 初始化用户数据和表单数据
        async getFormData(id) {
            let res = await getUserSocialAPI(id);
            this.userIfon = res.data.data.user;
            this.userSocialIfon = res.data.data.userSocialSecurity;
            // console.log(this.userIfon)
            // console.log(this.userSocialIfon)

            this.formData.userId = this.userId;
            this.formData.enterprisesPaySocialSecurityThisMonth = this.userSocialIfon.enterprisesPaySocialSecurityThisMonth;//本月社保缴纳状态
            this.formData.enterprisesPayTheProvidentFundThisMonth = this.userSocialIfon.enterprisesPayTheProvidentFundThisMonth;//本月公积金缴纳状态
            this.formData.participatingInTheCityId = this.userSocialIfon.participatingInTheCityId;//参保城市
            this.formData.participatingInTheCity = this.userSocialIfon.participatingInTheCity;//参保城市
            this.formData.socialSecurityType = this.userSocialIfon.socialSecurityType;//社保类型
            this.formData.householdRegistrationType = this.userSocialIfon.householdRegistrationType;//户籍类型
            this.getHouseholdRegistrationFn()//户籍类型
            this.formData.socialSecurityBase = this.userSocialIfon.socialSecurityBase;//社保基数
            this.formData.industrialInjuryRatio = this.userSocialIfon.industrialInjuryRatio;//工伤比例
            this.formData.socialSecurityNotes = this.userSocialIfon.socialSecurityNotes;//社保备注
            this.formData.providentFundCityId = this.userSocialIfon.providentFundCityId;//公积金城市
            this.formData.providentFundCity = this.userSocialIfon.providentFundCity;//公积金城市
            this.formData.providentFundBase = this.userSocialIfon.providentFundBase;//公积金基数
            this.formData.enterpriseProportion = this.userSocialIfon.enterpriseProportion * 100;//企业比例
            this.formData.personalProportion = this.userSocialIfon.personalProportion * 100;//个人比例
            this.formData.enterpriseProvidentFundPayment = this.userSocialIfon.enterpriseProvidentFundPayment;//公积金-公司
            this.formData.personalProvidentFundPayment = this.userSocialIfon.personalProvidentFundPayment;//公积金-个人
            this.formData.providentFundNotes = this.userSocialIfon.providentFundNotes;//公积金备注
            this.formData.lastModifyTime = this.userSocialIfon.lastModifyTime;//最后修改时间
            this.formData.socialSecuritySwitchUpdateTime = this.userSocialIfon.socialSecuritySwitchUpdateTime;//社保是否缴纳变更时间
            this.formData.providentFundSwitchUpdateTime = this.userSocialIfon.providentFundSwitchUpdateTime;//公积金是否缴纳变更时间
            // console.log(this.formData);

            // 获取当前城市社保缴费信息
            this.getCitySocialFn(this.formData.participatingInTheCityId)

        },
        //获取指定城市的社保缴费情况
        async getCitySocialFn(id) {
            let res = await getCitySocialAPI(id);
            this.getCitySocial = res.data.data;
            //     console.log(this.getCitySocial)
        },
        // 根据户籍id获取户籍类型名称
        getHouseholdRegistrationFn() {
            switch (this.formData.householdRegistrationType) {
                case 1:
                    this.formData.householdRegistration = "本市城镇"
                    break;
                case 2:
                    this.formData.householdRegistration = "本市农村"
                    break;
                case 3:
                    this.formData.householdRegistration = "外阜城镇"
                    break;
                case 4:
                    this.formData.householdRegistration = "外阜农村"
                    break;
                default:
                    break;
            }
        },
        //获取是否缴纳社保和公积金选项的修改时间
        getChangTime(type) {
            if (type === 0) {
                this.formData.socialSecuritySwitchUpdateTime = moment(new Date()).format();
            } else if (type === 1) {
                this.formData.providentFundSwitchUpdateTime = moment(new Date()).format();
            }
        },
        // 提交按钮
        async submitFn() {
            this.formData.lastModifyTime = moment(new Date()).format();
            let res = await submitUserSocialAPI(this.formData);
            if (res.status === 200) {
                this.$message({ message: '提交成功！', type: 'success' })
                this.backFn()
            } else {
                this.$message.error({ message: '提交发生错误！' })
                this.backFn()
            }

        },
        // 返回
        backFn() {
            this.$router.push('/social');
        }

    },
    computed: {
        enterpriseProvidentFundPayment() {
            return this.formData.enterpriseProvidentFundPayment = (this.formData.providentFundBase * this.formData.enterpriseProportion / 100).toFixed(2);
            // this.formData.personalProvidentFundPayment = (this.formData.providentFundBase * this.formData.personalProportion).toFixed(2); 
        },
        personalProvidentFundPayment() {
            return this.formData.personalProvidentFundPayment = (this.formData.providentFundBase * this.formData.personalProportion / 100).toFixed(2);
        },
    },
    filters: {
        dateFilter(date) {
            return moment(date).format("YYYY-MM-DD");
        },
        percentageFn(number) {
            return `${number}%`;
        }
    },
    watch: {
        formData: {
            deep: true,
            handler() {

            }
        }
    },
    mounted() {
        // 获取用户id
        this.getUserIdFn();
        // 获取城市列表
        this.getCitysListFn();
        // 初始化表单数据
        this.getFormData(this.userId);
    },
}
</script>

<style lang="scss" scoped>
.container {
    margin: 15px;
    padding: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
}

.header {
    div {
        display: inline-block;
        // border: 1px solid black;
        vertical-align: top;
        margin-right: 50px;
    }

    .headPhoto {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        span {
            display: inline-block;
            height: 3rem;
            line-height: 3rem;
            margin-right: 20px;

            .el-switch {
                margin-top: 12px;
            }
        }

        .exist {
            font-size: 0.8rem;
            font-weight: 800;
            color: #fff;
            height: 1.5rem;
            line-height: 1.5rem;
            padding: 2px 8px;
            background-color: #13ce66;
            border-radius: 5px;
        }

        .leave {
            font-size: 0.8rem;
            font-weight: 800;
            color: #fff;
            height: 1.5rem;
            line-height: 1.5rem;
            padding: 2px 8px;
            background-color: #ff4949;
            border-radius: 5px;
        }
    }
}

.body {
    margin-top: 20px;
}
</style>