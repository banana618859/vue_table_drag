<template>
    <div>
        <div>
            <slot name="conditionArea"></slot>
        </div>
        <div class="btns-area">
            <el-button-group>
                <slot name="btnsArea"></slot>
                <el-dropdown :hide-on-click='false'>
                    <el-button type="default">
                        显示隐藏列 <span v-show="hiddenColumnTotal > 0">({{ hiddenColumnTotal }})</span><i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="head in headers" :key="head.attr.prop">
                            <el-switch v-model="head.isShow" :active-text="head.attr.label"></el-switch><span></span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-button-group>
        </div>
        <el-table 
            ref="AppTable"
            :data="tabDatas"
            highlight-current-row
            @row-click='handleRowClick'
            @selection-change='handleSelectionChange'
            >
            <!-- 多选列 -->
            <el-table-column type="selection" width="55" v-if="multable"></el-table-column>
            <!-- 用户自定义需要显示的列 -->
            <!-- <el-table-column v-for="c in columns" 
                :key="c.attr.prop" 
                v-bind="c.attr"
                >
                <template slot-scope="scope">
                    <slot v-if="c.slot" :name="c.attr.prop" :row='scope.row'></slot>
                    <span v-else>{{ c.attr.formatter ? c.attr.formatter(scope.row, c) : scope.row[c.attr.prop] }}</span>
                </template>
            </el-table-column> -->

            <!-- 用户自定义需要显示的列 -->
            <template v-for="c in columns">
                <!-- 如果对应的列需要用到slot，则为对应的列生成具名插槽（作用域插槽） -->
                <el-table-column 
                    v-if="c.slot"
                    :key="c.attr.prop" 
                    v-bind="c.attr"
                    >
                    <template slot-scope="scope">
                        <slot :name="c.attr.prop" :row='scope.row'></slot>
                    </template>
                </el-table-column>
                <el-table-column 
                    v-else
                    :key="c.attr.prop" 
                    v-bind="c.attr"
                    >
                </el-table-column>
            </template>

            <!-- 操作列 -->
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <!-- 将作用域插槽返回的对象scope继续通过作用域插槽暴露出去 -->
                    <slot :row='scope.row'></slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'app-table',
    props: {
        tabColumns: {
            type: Array,
            required: true,
            validator: (cols) => {
                return cols.length >= 1 //表格至少需要1列
            }
        },
        tabDatas: Array,
        multable: { //是否多选
            type: Boolean,
            default: true
        }
    },
    computed: {
        columns() {
            return this.headers.filter(h => h.isShow);
        },
        hiddenColumnTotal() {
            return this.headers.filter(h => !h.isShow).length;
        }
    },
    created() {
        // this.headers = JSON.parse(JSON.stringify(this.tabColumns));
        this.headers = this.tabColumns.map((c) => {
            if(c.isShow === undefined){
                this.$set(c, 'isShow', true)
            }
            return c;
        });
    },
    data() {
        return {
            headers: [],
        }
    },
    methods: {
        //单击行
        handleRowClick(row) {
            // if(!this.multable){ //单选
            //     this.$refs.AppTable.clearSelection();
            // }
            this.$refs.AppTable.toggleRowSelection(row);
        },
        //选择项改变时候（返回当前选中的行）
        handleSelectionChange(selection) {
            this.$emit('rowSelectionChanged', selection);
        },     
    }
}
</script>

<style scoped>
.btns-area{
    padding-left: 20px;
    text-align: left;
}
</style>
