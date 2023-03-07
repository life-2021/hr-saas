<template>
    <div>
        <div class="container topToolsContainer">
            <div class="smallContainer" v-for="item in setList" :key="item.key">
                <span>{{ item.name }}</span>

                <el-switch v-model="item.suspensionState" active-color="#13ce66" inactive-color="#cccccc" :active-value="1"
                    :inactive-value="2" @change="updataFn(item)">
                </el-switch>
            </div>

        </div>
    </div>
</template>

<script>
import { getProcessSetAPI, updataProcessSetAPI } from '@/api/approvals'
export default {
    data() {
        return {
            setList: [],
        }
    },
    methods: {
        async getgetprocessSettings() {
            let res = await getProcessSetAPI();
            this.setList = res.data.data
            console.log(res.data.data)
        },
        async updataFn(item) {
            let processKey = item.key;
            let enable = item.suspensionState === 1 ? true : false;
            let res = await updataProcessSetAPI(processKey, enable)
            if (res.data.code === 10000) {
                this.$message({ message: `${res.data.message}`, type: 'success' })
            } else {
                	this.$message.warning({ message: `${res.data.message}` })
            }
            
        },
    },
    mounted() {
        this.getgetprocessSettings()
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

.topToolsContainer {
    div {
        display: inline-block;
    }

    .smallContainer {
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 10px 20px;
        margin: 15px;

        span {
            padding: 0px 10px;
            margin-right: 20px;
            border-right: 1px solid #ccc;
        }

        .el-switch {
            margin-top: -5px;
        }
    }

}
</style>