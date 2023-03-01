<template>
    <div class="background">
        <div class="container">
            <div class="title">
                <span>个人信息</span>
            </div>
            <div class="main">
                <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div>
                <div class="content">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;">
                        </el-date-picker>

                    </el-form-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            mobile: '',
            sex: '',
            birthday:'',
            squareUrl: '',
        }
    }
}
</script>

<style lang="scss" scoped>
.background {
    background-color: #f0f2f5;
    height: 93.5vh;
}
</style>