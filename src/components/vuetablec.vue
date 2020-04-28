<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-27 14:03:15
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-28 20:00:18
 -->
 <template>
    <div style="padding:15px;">
      <h3 style="text-align: left; padding:10px; background: #ccc;">
        vue+element-ui+sortable.js实现表格行和列的拖拽 - 简书
      </h3>
        <div style="width: 55%; margin-right:4%; float: left;">
            <el-table :data="tableData"
                border
                row-key="id"
                align="left"
                @cell-click="cellClick">
                <el-table-column 
                    v-for="(item, index) in dropCol"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label">
                    <template slot-scope="scope">
                      <p>
                        <span v-show="!scope.row.edit">
                          {{ scope.row[dropCol[index].prop] }}
                        </span>
                        <span v-show="scope.row.edit">
                          <el-input v-model="scope.row[dropCol[index].prop]"></el-input>
                        </span>
                        
                      </p>
                      <!-- <p>{{ scope.row[item.prop] }}</p> -->
                    </template>
                </el-table-column>

                <!--你可以看看这个 参考链接1： https://www.jianshu.com/p/362f880d0bfd-->
                <!--你可以看看这个 参考链接2：https://blog.csdn.net/qq_36752632/article/details/102552855 -->
            </el-table>
        </div>
        <div style="width: 40%; float: left; border:1px solid #ccc;">
            <pre style="text-align: left">
                {{dropCol}}
            </pre>
            <hr>
            <pre style="text-align: left">
                {{tableData}}
            </pre>
        </div>

    </div>
  </template>
  <script>
  import Sortable from 'sortablejs'
  export default {
      filters:{
        valueFilter(value,row){
            console.log('value:',value,row);
            return row[value];
        }
      },
    data() {
      return {
        dropCol: [
          {
            label: '日期',
            prop: 'date'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ],
        tableData: [
        {
            id:'1',
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 188 弄',
            edit: false
          },
          {
            id:'2',
            date: '2015555',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 100 弄',
            edit: true
          },
          {
            id:'3',
            date: '2016-07-03',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 233 弄',
            edit: false
          },
          {
            id:'4',
            date: '2020-04-28',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 56 弄',
            edit: false
          }
        ]
      }
    },
    mounted() {
      this.rowDrop()
      this.columnDrop()
    },
    methods: {
      cellClick(row, column, cell, event){
        console.log('cellClick:',row, column, cell, event)
      },
      //行拖拽
      rowDrop() {
        const tbody = document.querySelector('.el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
        // Element is chosen
        onChoose: function (/**Event*/evt) {
            console.log('onChoose:',evt)
            evt.oldIndex;  // element index within parent
        },
    
        // Element is unchosen
        onUnchoose: function(/**Event*/evt) {
            console.log('onUnchoose:',evt)
            // same properties as onEnd
        },
    
        // Element dragging started
        onStart: function (/**Event*/evt) {
            console.log('onStart:',evt)
            evt.oldIndex;  // element index within parent
        },
        onEnd({ newIndex, oldIndex }) {
            console.log('onEnd:',newIndex, oldIndex)
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
          }
        })
      },
      //列拖拽
      columnDrop() {
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
        console.log('wrapperTr:',wrapperTr)
        this.sortable = Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          // Element is chosen
            onChoose: function (/**Event*/evt) {
                console.log('onChoose:',evt)
                evt.oldIndex;  // element index within parent
            },
        
            // Element is unchosen
            onUnchoose: function(/**Event*/evt) {
                console.log('onUnchoose:',evt)
                // same properties as onEnd
            },
        
            // Element dragging started
            onStart: function (/**Event*/evt) {
                console.log('onStart:',evt)
                evt.oldIndex;  // element index within parent
            },
            onEnd: evt => {
                console.log('onEnd:',evt)
                let oldIndx = evt.oldIndex;
                let newIndx = evt.newIndex;
                const oldItem = this.dropCol[oldIndx]
                console.log('oldItem:',oldItem)
                // 真正改变列头数据--变化列头，就能实现列拖动
                // 手动改变列头
                this.dropCol.splice(oldIndx, 1) // 删除旧一行 删除为1
                this.dropCol.splice(newIndx, 0, oldItem) // 插入新一行 插入为0
                // 手动改变每行的那一列
                // for(let i=0;i<this.tableData.length;i++){
                //     let item = this.tableData[i]
                //     let keyArr=[];
                //     for(let key in item){
                //         // console.log('key:',i,key);
                //         // 收藏每一行的key
                //         keyArr.push(key)
                //     }
                //     // console.log('keyArr:',i,keyArr);
                //     // 取出旧的
                //     let oldKey = keyArr[oldIndx];
                //     // 将旧的删除
                //     keyArr.splice(oldIndx,1);
                //     // 将旧的key重新插入新的位置
                //     keyArr.splice(newIndx,0,oldKey);
                //     console.log('keyArr:',i,keyArr);
                //     // 组合成一个新对象
                //     let newObj={}
                //     keyArr.forEach(key=>{
                //         newObj[key]=item[key]
                //     })
                //     // 替换原来数据
                //     console.log('keyArr:',i,keyArr);
                //     this.tableData.splice(i,1,newObj)
                // }
            }
        })
      }
    }
  }
  </script>
  <style scoped>
  </style>