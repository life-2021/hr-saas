<template>
    <div class="container">
        <div class="header">
            <div class="title">个人信息</div>
        </div>
        <!-- <button @click="testFn">按钮</button> -->
        <div class="main">
            <!-- 头像 -->
            <div class="headPhoto">
                <img :src="formData.staffPhoto ? formData.staffPhoto : headPhotoUrl" alt="">
            </div>
            <!-- 内容 -->
            <div class="content">
                <el-form ref="form" :model="formData" label-width="80px">

                    <el-form-item label="姓名">
                        <el-input v-model="formData.username"></el-input>
                    </el-form-item><br>

                    <el-form-item label="手机号">
                        <el-input v-model="formData.mobile"></el-input>
                    </el-form-item><br>

                    <el-form-item label="性别">
                        <el-select v-model="formData.sex">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item><br>

                    <el-form-item label="出生日期">
                        <el-date-picker v-model="formData.birthday" type="date" placeholder="选择日期时间"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item><br>

                    <el-form-item>
                        <el-button type="primary" @click="submitFn">保存</el-button>
                        <el-button @click="backFn">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { updataUserInfoAPI } from '@/api/user.js'
export default {
    data() {
        return {
            headPhotoUrl: require("../../../assets/common/img.jpeg"),
            formData: {
                username: '',
                mobile: '',
                sex: '',
                birthday: '',
                staffPhoto: '',
            },
        }
    },
    methods: {
        testFn() {
            console.log(this.formData)
        },
        // 提交按钮
        async submitFn() {
            this.$message.error({ message: '已提交(EeeorCode:405)' });
            let res = await updataUserInfoAPI(this.formData)
        },
        // 返回
        backFn() {
            this.$router.push('/dashboard');
        }
    },
    created() {
        this.formData = JSON.parse(JSON.stringify(this.$store.state.user.userInfo))
        this.formData.birthday = moment(this.$store.state.user.userInfo.birthday).format('YYYY-MM-DD')
    },
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

}

.main {
    padding: 20px;

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

    }
}
</style>