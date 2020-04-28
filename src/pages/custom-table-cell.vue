<template>
    <div>
        <el-table :data="tableData">
            <el-table-column label="这是文字" :render-header="renderHeader" prop="name"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            visible: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        renderHeader(h, {column, $index}, index) {
            return (
                <span>
                    问题分类
                    <el-popover placement='bottom' width='200' height='200' trigger="click" v-model={this.visible}>
                        <span slot="reference" style='flex: 1;'>
                            <i class="el-icon-search" style={this.search ? {'color' : 'red'} : {'color': 'blue'}}></i>
                        </span>
                        <el-input size='small' v-model={this.search} placeholder='请输入内容'></el-input>
                        <div class='el-table-filter__bottom'>
                            <button class={this.search ? '' : 'is-disabled'}>筛选</button>
                            <button on-click={this.clearSearch}>重置</button>
                        </div>
                    </el-popover>
                </span>
            );
        },
        clearSearch() {
            this.search = '';
        }
    }
}
</script>


