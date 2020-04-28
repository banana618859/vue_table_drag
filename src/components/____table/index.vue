<template>
    <div>
        <my-table :tabHeades='tabHeades' :tabDatas='tabDatas'></my-table>
    </div>
</template>

<script>
import myTable from './myTable'
export default {
    name: 'table-use',
    data() {
        return {
            tabHeades: [
                //需要写全，每个元素的isShow属性，不然子组件里面会监听不到这些属性的变化。
                //当然，如果子组件里面可以通过 Vue.set 来解决这个问题。
                {label: '编号', key: 'id'},
                {label: '订单号', key: 'orderId', isShow: false},
                {label: '用户名', key: 'username'}
            ],
            tabDatas: [
                {'id': 1, 'orderId': '10001', 'username': '小张'},
                {'id': 3, 'orderId': '10003', 'username': '小王'},
                {'id': 4, 'orderId': '10004', 'username': 'aaa'},
                {'id': 5, 'orderId': '10005', 'username': 'bbb'},
                
            ]
        }
    },
    components: {
        myTable
    }
}
</script>
