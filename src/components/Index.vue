<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-27 11:01:17
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-28 19:49:19
 -->
<template>
    <div>
        <!-- <router-link to='/table'>table组件demo</router-link><br/> -->
        <p>
            <el-button type="primary">
                <router-link to='/vxetable'>vxe-table实现表格行和列的拖拽</router-link><br/>
            </el-button> 
        </p>        
        
        <p>
            <el-button type="success">
                <router-link to='/vuetable'>vue+element-ui+sortable.js实现表格行和列的拖拽 - 简书</router-link><br/>
            </el-button>
        </p>
        
        
        <!-- <router-link to='/compDemo'>if显示隐藏子组件时，子组件生命周期测试demo</router-link><br/>
        <router-link to='/jsxDemo'>jsx使用例子</router-link><br/>
        <router-link :to="{name: 'tableUsed'}">基于elementui封装的table组件demo</router-link><br/>
        <router-link :to="{name: 'customTableCell'}">elementui表格自定义列头（列头提供输入框过滤 jsx语法基础使用）</router-link><br/>
        <router-link :to="{name: 'nestComp'}">嵌套组件嵌套（属性传递、事件绑定）</router-link> -->
        <!-- <ul>
            <li v-for="(item, idx) in arr" :key="idx">{{ item }}</li>
        </ul>
        <button @click="change">change</button> -->
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            arr: [
                {id: 1, name: '111'},
                {id: 2, name: '22222'},
                {id: 3, name: '333333'},
                {id: 4, name: '4444444'},
            ],

            newArr: [
                {id: 11, name: '111'},
                {id: 22, name: '22222'},
                {id: 3, name: '3333333333333333333333'},
                {id: 14, name: '4444444'},
            ]
        }
    },
    methods: {
        change() {
            this.newArr.forEach(ele => {
                let idx = this.arr.map(o => o.id).indexOf(ele.id)
                if(idx > -1) {
                    this.$set(this.arr, idx, ele)
                }else{
                    this.arr.push(ele)
                }                
            });

            // let newObj = {id: 21, name: 'aaaaaaaaaaaaaaaa'}
            
            // let idx = this.arr.map(o => o.id).indexOf(newObj.id)

            // let idx2 = this.arr.findIndex(o => o.id == newObj.id)

            // if(idx > -1) {
            //     Vue.set(this.arr, idx, newObj)
            // }else{
            //     this.arr.push(newObj)
            // }

        }
    }
}
</script>

<style scoped>
    a{color:#eeee;}
</style>
