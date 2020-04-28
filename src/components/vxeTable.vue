<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-27 17:56:44
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-28 19:53:57
 -->
<template>
  <div style="text-align: left;">
    <h3 style="text-align: left; padding:10px; background: #ccc;">
      仅仅用vxe-table实现表格行和列的拖拽
    </h3>
    <p>
      <a style="padding: 20px;display: line-block; overflow: hidden;" href="https://xuliangzhan_admin.gitee.io/vxe-table/#/table/api">
        vxe-table官网： https://xuliangzhan_admin.gitee.io/vxe-table/#/table/api
      </a>
    </p>
      <vxe-grid
          border
          ref="xTable"
          show-overflow
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeCellMethod}"
          @edit-disabled="editDisabledEvent">
    </vxe-grid>
  </div>
</template>

<script>
    import Sortable from 'sortablejs';
    import XEUtils from 'xe-utils'
    export default {
        data () {
        return {
            tableData: [
            {
                    name: 'tom111',
                    sex: 'male',
                    age: 10,
                    address: '广东'
                },
                {
                    name: 'jerry',
                    sex: 'female',
                    age: 11,
                    address: '江苏'
                },
                {
                    name: 'tom13',
                    sex: 'male',
                    age: 17,
                    address: '浙江'
                },
                {
                    name: 'jerry4',
                    sex: 'female',
                    age: 15,
                    address: '河北'
                }
            ],
            tableColumn: [
            {
                width: 60,
                slots: {
                default: () => {
                    return [
                    <span class="drag-btn">
                        <i class="vxe-icon--menu"></i>
                    </span>
                    ]
                },
                header: () => {
                    return 'Drag'
                }
                }
            },
            { type: 'seq', width: 50 },
            { field: 'name', title: 'label.name', editRender: { name: 'input' } },
            { field: 'sex', title: 'label.sex', editRender: { name: 'input' } },
            { field: 'age', title: 'Age', editRender: { name: 'input' } },
            { field: 'address', title: 'Address', editRender: { name: 'input' } }
            ]
        }
        },
        created () {
        // this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
        this.treeDrop();
        this.columnDrop()
        },
        methods: {
        activeCellMethod ({ column, columnIndex }) {
            if (columnIndex === 1) {
            return false
            }
            return true
        },
        editDisabledEvent ({ row, column }) {
            alert('禁止编辑')
        },
        columnDrop () {
              this.$nextTick(() => {
              let xTable = this.$refs.xTable
              this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                handle: '.vxe-header--column:not(.col--fixed)',
                onEnd: ({ item, newIndex, oldIndex }) => {
                  let { fullColumn, tableColumn } = xTable.getTableColumn()
                  let targetThElem = item
                  let wrapperElem = targetThElem.parentNode
                  let newColumn = fullColumn[newIndex]
                  if (newColumn.fixed) {
                    // 错误的移动
                    if (newIndex > oldIndex) {
                      wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
                    } else {
                      wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
                    }
                    return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
                  }
                  // 转换真实索引
                  let oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
                  let newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
                  // 移动到目标列
                  let currRow = fullColumn.splice(oldColumnIndex, 1)[0]
                  fullColumn.splice(newColumnIndex, 0, currRow)
                  xTable.loadColumn(fullColumn)
                }
              })
            })
        },
        treeDrop () {
              this.$nextTick(() => {
                let xTable = this.$refs.xTable
                console.log('xTable.$el:',xTable)
                this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
                  handle: '.drag-btn',
                  onEnd: ({ item, oldIndex }) => {
                    let options = { children: 'children' }
                    let targetTrElem = item
                    let wrapperElem = targetTrElem.parentNode
                    let prevTrElem = targetTrElem.previousElementSibling
                    let tableTreeData = this.tableTreeData
                    let selfRow = xTable.getRowNode(targetTrElem).item
                    let selfNode = XEUtils.findTree(tableTreeData, row => row === selfRow, options)
                    if (prevTrElem) {
                      // 移动到节点
                      let prevRow = xTable.getRowNode(prevTrElem).item
                      let prevNode = XEUtils.findTree(tableTreeData, row => row === prevRow, options)
                      if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
                        // 错误的移动
                        let oldTrElem = wrapperElem.children[oldIndex]
                        wrapperElem.insertBefore(targetTrElem, oldTrElem)
                        return this.$XModal.message({ message: '不允许自己给自己拖动！', status: 'error' })
                      }
                      console.log('currRow------',selfNode)
                      if(!selfNode){
                          return
                      }
                      let currRow = selfNode ? selfNode.items.splice(selfNode.index, 1)[0]:''
                      
                      if (xTable.isTreeExpandByRow(prevRow)) {
                        // 移动到当前的子节点
                        prevRow[options.children].splice(0, 0, currRow)
                      } else {
                        // 移动到相邻节点
                        console.log('移动到相邻节点')
                        prevNode.items.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
                      }
                    } else {
                        console.log('移动到第一行')
                      // 移动到第一行
                      if(!selfNode){
                          return
                      }
                      var currRow = selfNode.items.splice(selfNode.index, 1)[0]
                      tableTreeData.unshift(currRow)
                    }
                    // 如果变动了树层级，需要刷新数据
                    xTable.syncData()
                  }
                })
              })
            }
        }
    }
</script>