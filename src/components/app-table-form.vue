<template>
    <el-form ref="tableConditions" :inline="true" class="demo-form-inline" v-bind='$attrs'>
        <app-table-form-item v-for="(item, idx) in items" :key="idx" :label="item.label" v-show="idx < 2 || showMoreConditions">
            <slot :name="item.prop"></slot>
        </app-table-form-item>
        <app-table-form-item class="btns-content" :sm='conditionTotal % 3 !== 0 || !showMoreConditions ? 8 : 24' :class="[showMoreConditions && conditionTotal % 3 === 0 ? 'showMoreCondition' : 'hideMoreCondition']">
            <el-button type="primary" @click='handleSearch'>查询</el-button>
            <el-button type="default" @click="handleReset">重置</el-button>
            <el-button type="text" @click="handleShowMoreCondition" v-if="conditionTotal > 2">
                <span v-if="showMoreConditions">
                    收起<i class="el-icon-arrow-up el-icon--right"></i>
                </span>
                <span v-else>
                    展开<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            </el-button>
        </app-table-form-item>
    </el-form>
</template>

<script>
import AppTableFormItem from './app-table-form-item'
export default {
    name: 'app-table-form',
    components: {
        AppTableFormItem,
    },
    computed: {
        // formItems() {
        //     return this.items.map((item, idx) => {
        //         if(idx < 2){
        //             this.$set(item, 'isShow', true)
        //         }else{
        //             this.$set(item, 'isShow', false)
        //         }
        //         return item;
        //     })
        // },
        conditionTotal() {
            return this.items.length
        }
    },
    props: {
        items: Array, //item: label, prop
        // bindModel: Object
    },
    data() {
        return {
            showMoreConditions: false
        }
    },
    methods: {
        handleShowMoreCondition() {
            this.showMoreConditions = !this.showMoreConditions
        },
        handleSearch() {
            this.$emit('onSearch')
        },
        handleReset() {
            this.$emit('onReset')
        }

    }
}
</script>

<style scoped>

.demo-form-inline{
    overflow: hidden;
}

/* 隐藏更多搜索条件 */
/*独占一行，按钮右对齐*/
.showMoreCondition{ 
    text-align: right; 
    padding-right: 10px;
}

/* 隐藏或只有一行时，按钮左边距小一些 */
.hideMoreCondition{
    text-align: left;
    padding-left: 20px;
}
</style>



