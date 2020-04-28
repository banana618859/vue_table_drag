<template>
    <div>
        <h3>基于elementui封装的table组件demo</h3>
        <app-table 
            :tab-columns='tabColumns' 
            :tab-datas='tabDatas'
            @rowSelectionChanged='rowSelected'
        >   
            <!-- 表格查询区域 -->
            <template slot="conditionArea">
                <app-table-form 
                    :label-width="'100px'"
                    :items='tableSearchItems' 
                    @onSearch='handleSearch' 
                    @onReset='() => searchForm = {}'>
                    <template slot='account'>
                        <el-input style="width: 100%;" v-model="searchForm.account" placeholder="审批人"></el-input>
                    </template>
                    <template slot='region'>
                        <el-input style="width: 100%;" v-model="searchForm.region" placeholder="审批人"></el-input>
                    </template>
                    <template slot='username'>
                        <el-input style="width: 100%;" v-model="searchForm.username" placeholder="审批人"></el-input>
                    </template>
                    <template slot='sex'>
                        <el-input style="width: 100%;" v-model="searchForm.sex" placeholder="性别"></el-input>
                    </template>
                    <template slot='age'>
                        <el-input style="width: 100%;" v-model="searchForm.age" placeholder="年龄"></el-input>
                    </template>
                    <template slot='keywords'>
                        <el-input style="width: 100%;" v-model="searchForm.keywords" placeholder="关键字"></el-input>
                    </template>
                </app-table-form>
            </template>
            <!-- 表格批量操作区域 -->
            <template slot="btnsArea">
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </template>
            <!-- 通过slot自定义列：参数，当前行 -->
            <template slot='gender' slot-scope="scope">
                <el-tag v-if="scope.row.gender == 1" type="success">男</el-tag>
                <el-tag v-if="scope.row.gender == 0" type="info">女</el-tag>
            </template>
            <!-- 表格行内操作列 -->
            <template slot-scope="scope">
                <el-button @click="preview(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
        </app-table>
    </div>
</template>

<script>
import AppTable from '../../components/app-table'
import AppTableForm from '../../components/app-table-form'
import AppTableFormItem from '../../components/app-table-form-item'

//   // form表单类型映射
//   formTypeMaps: {
//     1: 'text',   // 普通输入框
//     2: 'select', // 下拉选择
//     3: 'radio',  // 单选
//     4: 'checkbox', // 多选
//     5: 'textarea',  // 文本域
//     6: 'password',  // 密码输入框
//     7: 'date',      // 日期  
//     8: 'time',     //  时间
//     9: 'datetime',  // 日期时间
//     10: 'daterange', // 日期范围
//   },

export default {
    name: 'nest-components-demo',
    data() {
        return {
            //表单搜索条件
            searchForm: {
                account: '',
                region: '',
                username: '',
                sex: '',
                age: '',
                keywords: '',
            },
            //表单搜索条件描述
            tableSearchItems: [
                { prop: 'account', label: '账号', },
                { prop: 'region', label: '活动区域', },
                { prop: 'username', label: '用户名', },
                { prop: 'sex', label: '性别', },
                { prop: 'age', label: '年龄', },
                { prop: 'keywords', label: '关键字', },
            ],
            tabColumns: [
                {
                    attr: {prop: 'userId', label: '用户编号'}
                },
                {
                    attr: {prop: 'username', label: '用户名'},
                    isShow: false
                },
                {
                    attr: {prop: 'gender', label: '性别'},
                    slot: true
                },
                {
                    attr: {prop: 'age', label: '年龄', formatter: this.formatterUsername},
                },
            ],
            tabDatas: [
                {userId: '1', username: 'qingyun', gender: '1', age: 31},
                {userId: '2', username: 'aaaaaaaa', gender: '0', age: 21},
                {userId: '3', username: 'bbbbbbb', gender: '1', age: 25},
                {userId: '4', username: 'cccccccc', gender: '0', age: 27},
            ],
            checkedRows: [],//选中的行
            // showMoreConditions: false,//是否显示所有查询条件（默认所有查询条件都显示）
            // conditionTotal: 0, //查询条件数量
        }
    },
    // computed: {

    // },
    // mounted() {
    //     // debugger
    //     // let totalChildren = this.$refs.tableConditions.$slots.default.filter(c => c.componentOptions && c.componentOptions.tag == 'app-table-form-item');
    //     // this.conditionTotal = totalChildren.length

    // },
    methods: {
        //监听选中的行
        rowSelected(rows) {
            this.checkedRows = rows;
            console.log(this.checkedRows.map(r => r.userId));
        },
        preview(row) {
            console.log(JSON.stringify(row));
        },
        formatterUsername(row, column) {
            if(row.age < 25){
                return '青年';
            }else{
                return '老年人';
            }
        },
        // handleShowMoreCondition() {
        //     this.showMoreConditions = !this.showMoreConditions
        // },
        handleSearch() {
            console.log('点击了搜索按钮')
            console.log(JSON.stringify(this.searchForm))
        }

    },
    components: {
        AppTable,
        AppTableFormItem,
        AppTableForm,
    }
}
</script>
