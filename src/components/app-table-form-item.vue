<template>
    <el-col class="table-form-item-col" :sm="sm" :xs="24">
        <el-form-item :label="label" style="width: 100%;">
            <slot></slot>
        </el-form-item>
    </el-col>
</template>

<script>
export default {
    name: 'app-table-form-item',
    props: {
        label: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: Number,
            default: 100
        },
        //用于控制table搜索表单中的一项的显示方式（三列或独占一行）
        sm: {
            type: Number,
            default: 8
        }
    },
    data () {
        return {

        }
    }
}
</script>


<style>
.table-form-item-col .el-form-item__content{
    width: calc(100% - 100px);
} 
</style>
