<template>
    <div class="tab-wrapper">
        <div class="tab-title-wrapper">
            <div class="tab-title">table测试组件</div>
            <div class="tab-actions" @mouseover="showTableAction = true" @mouseout="showTableAction = false">
                显示/隐藏列
                <div class="tab-action-item-wrapper" v-show="showTableAction">
                    <div v-for="head in heades" :key="head.key" @click="showColumn(head)" :class="{'active': head.isShow != false}">{{ head.label }}</div>
                </div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-for="head in heades" v-show="head.isShow != false" :key="head.key">{{ head.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in tabDatas" :key="idx">
                    <td v-for="(head, idx2) in heades" v-show="head.isShow != false" :key="head.key + idx2">
                        {{ item[head.key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'table-component',
    props: {
        tabHeades: Array,
        tabDatas: Array
    },
    data() {
        return {
            showTableAction: false,
            heades: []
        }
    },
    methods: {
        showColumn(head) {
            // head.isShow = !head.isShow
            this.$set(head, 'isShow', !head.isShow);
        }
    },
    mounted() {
        this.heades = this.tabHeades;
    }
}
</script>

<style scoped>

.tab-wrapper, table{
    width: 100%;
}

thead th{
    cursor: pointer;
}

.tab-title-wrapper {
    display: flex;
}

.tab-title-wrapper .tab-title{
    flex: 1;
    text-align: left;
}

.tab-title-wrapper .tab-actions{
    position: relative;
    cursor: pointer;
}

.tab-title-wrapper .tab-actions .tab-action-item-wrapper{
    position: absolute;
    text-align: left;
}

.tab-title-wrapper .tab-actions .tab-action-item-wrapper .active{
    background: #ccc
}
</style>
