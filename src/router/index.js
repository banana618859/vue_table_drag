/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-27 11:01:17
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-28 16:26:46
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index'
// import Table from '@/components/table/index'
import compDemo from '@/components/comp-demo'
import JsxdDemo from '@/components/JsxDemo'
import vuetable from '@/components/vuetablec'
import vxetable from '@/components/vxeTable'
import TableUsed from '@/pages/table-used'
import NestComponentsDemo from '@/pages/nest-component-demo/grandpa-comp'
import CustomTableCell from '@/pages/custom-table-cell'
// NestComponentsDemo

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home },
    // {path: '/table', name: 'Table', component: Table },
    {path: '/compDemo', name: 'compDemo', component: compDemo },
    {path: '/jsxDemo', name: 'JsxdDemo', component: JsxdDemo },
    {path: '/table-used', name: 'tableUsed', component: TableUsed},
    {path: '/custom-table-cell', name: 'customTableCell', component: CustomTableCell},
    {path: '/nest-components-demo', name: 'nestComp', component: NestComponentsDemo},
    {path: '/vuetable', name: 'vuetable', component: vuetable},
    {path: '/vxetable', name: 'vxetable', component: vxetable},
  ]
})
