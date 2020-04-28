<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-27 11:21:35
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-27 11:32:42
 -->
 <template>
    <div class="pub-table-cla">
      <el-button-group style="width: 100%;margin-bottom: 10px;">
        <div style="width: 50%;float: left;">
          <slot name="btnsArea"></slot>
        </div>
        <div style="float: right;height: 30px">
          <el-dropdown :hide-on-click='false' style="float: left; margin-right: 10px;margin-bottom: 13px;">
            <el-button type="default"class="pub-button-he">
              显示隐藏列 <span v-show="hiddenColumnTotal > 0">({{ hiddenColumnTotal }})</span><i
              class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" style="overflow-y: auto;max-height: 70%">
              <el-dropdown-item v-for="head in headers" :key="head.attr.prop">
                <el-switch v-model="head.isShow" :active-text="head.attr.label" @change="headerChange"></el-switch>
                <span></span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float: right;">
            <slot name="searchBtn"></slot>
          </div>
        </div>
      </el-button-group>
      <div class="table-height">
        <div class="table-wrap w-table"  :class="{'w-table_moving': dragState.dragging}">
          <el-table
            ref="AppTable"
            :data="tabDatas"
            :stripe="true"
            border
            height="500"
            row-key="roleId"
            highlight-current-row
            @selection-change='handleSelectionChange'
            style="width: 100%;"
            :header-cell-class-name="headerCellClassName"
          >
            <!-- 多选列 -->
            <el-table-column type="selection" width="55" v-if="multable"></el-table-column>
            <el-table-column type="index" label="序号" v-if="isShowIndex" width="55"></el-table-column>
            <template v-for="(item,index) in dragHeaders">
              <el-table-column
                v-if="item.isShow && item.slot"
                :key="index"
                v-bind="item.attr"
                :show-overflow-tooltip="true"
                :column-key="index.toString()"
                :render-header="renderHeader"
              >
                <!--某一列插槽-->
                <template slot-scope="scope">
                  <slot :name="item.attr.prop" :row='scope.row'></slot>
                </template>
              </el-table-column>
              <el-table-column
                v-else-if="item.isShow"
                :key="index"
                v-bind="item.attr"
                :show-overflow-tooltip="true"
                :column-key="index.toString()"
                :render-header="renderHeader"
              >
              </el-table-column>
            </template>
   
            <!-- 操作列 -->
            <template v-if="isShowOperate">
              <el-table-column
                v-if="operationNum == 3"
                label="操作"
                width="160"  >
                <template slot-scope="scope">
                  <!-- 将作用域插槽返回的对象scope继续通过作用域插槽暴露出去 -->
                  <slot :row='scope.row'></slot>
                </template>
              </el-table-column>
              <el-table-column
                v-else
                label="操作"
                width="100"  >
                <template slot-scope="scope">
                  <!-- 将作用域插槽返回的对象scope继续通过作用域插槽暴露出去 -->
                  <slot :row='scope.row'></slot>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
      </div>
    </div>
  </template>
   
  <script>
   
    export default {
      name: 'pub-table',
      props: {
        //表头参数
        // tabColumns: {
        //   type: Array,
        //   required: true,
        //   validator: (cols) => {
        //     return cols.length >= 1 //表格至少需要1列
        //   }
        // },
        //展示的列数据
        tabDatas: Array,
        //是否多选
        multable: {
          type: Boolean,
          default: true
        },
        //几种操作用于设置操作列宽度
        operationNum: {
          type: Number,
          default: 2
        },
        //是否显示操作
        isShowOperate:{
          type: Boolean,
          default: true
        },
        //是否显示序号
        isShowIndex:{
          type: Boolean,
          default: true
        },
      },
      computed: {
        //隐藏列数
        hiddenColumnTotal () {
          return this.headers.filter(h => !h.isShow).length
        },
      },
      created () {
        this.headers = this.tabColumns.map((c) => {
          if (c.isShow === undefined) {
            this.$set(c, 'isShow', true)
          }
          return c
        })
        this.dragHeaders = this.headers;
      },
      data () {
        return {
        tabColumns: [
                {
                    attr: {prop: 'code', label: '编码',sortable: true}
                },
                {
                    attr: {prop: 'name', label: '名称'},
                    isShow: true,
                    slot: true,
                },
        ],
          headers: [],
          dragHeaders:[],
          dragState: {
            start: -1, // 起始元素的 index
            end: -1, // 结束元素的 index
            move: -1, // 移动鼠标时所覆盖的元素 index
            dragging: false, // 是否正在拖动
            direction: undefined // 拖动方向
          }
        }
      },
      mounted () {
      },
      watch: {
      },
      methods: {
        headerChange(){
          this.dragHeaders = []
          for(let i=0;i<this.headers.length;i++){
            if(this.headers[i].isShow){
              this.dragHeaders.push(this.headers[i])
            }
   
          }
        },
        headerCellClassName ({column, columnIndex}) {
          if(this.multable == true && this.isShowIndex == true){
            return (columnIndex - 2 === this.dragState.move ? `darg_active_${this.dragState.direction}` : '')
          }else if (this.multable == true || this.isShowIndex == true) {
            return (columnIndex - 1 === this.dragState.move ? `darg_active_${this.dragState.direction}` : '')
          }else{
            return (columnIndex === this.dragState.move ? `darg_active_${this.dragState.direction}` : '')
          }
   
        },
        renderHeader (createElement, {column}) {
          return createElement(
            'div', {
              'class': ['thead-cell'],
              on: {
                mousedown: ($event) => {
                  this.handleMouseDown($event, column)
                },
                mouseup: ($event) => {
                  this.handleMouseUp($event, column)
                },
                mousemove: ($event) => {
                  this.handleMouseMove($event, column)
                }
              }
            }, [
              // 添加 <a> 用于显示表头 label
              createElement('a', column.label),
              // 添加一个空标签用于显示拖动动画
              createElement('span', {
                'class': ['virtual']
              })
            ])
        },
        // 按下鼠标开始拖动
        handleMouseDown (e, column) {
          this.dragState.dragging = true
          this.dragState.start = parseInt(column.columnKey)
          // 给拖动时的虚拟容器添加宽高
          let table = document.getElementsByClassName('w-table')[0]
          let virtual = document.getElementsByClassName('virtual')
          for (let item of virtual) {
            item.style.height = table.clientHeight - 1 + 'px'
            item.style.width = item.parentElement.parentElement.clientWidth + 'px'
          }
        },
   
  // 鼠标放开结束拖动
        handleMouseUp (e, column) {
          this.dragState.end = parseInt(column.columnKey) // 记录起始列
          this.dragColumn(this.dragState)
          // 初始化拖动状态
          this.dragState = {
            start: -1,
            end: -1,
            move: -1,
            dragging: false,
            direction: undefined
          }
        },
   
  // 拖动中
        handleMouseMove (e, column) {
          if (this.dragState.dragging) {
            let index = parseInt(column.columnKey) // 记录起始列
            if (index - this.dragState.start !== 0) {
              this.dragState.direction = index - this.dragState.start < 0 ? 'left' : 'right' // 判断拖动方向
              this.dragState.move = parseInt(column.columnKey)
            } else {
              this.dragState.direction = undefined
            }
          } else {
            return false
          }
        },
   
  // 拖动易位
        dragColumn ({start, end, direction}) {
          if (start < 0 || end < 0 || start == end) {
            return
          }
          let tempData = []
          let left = direction === 'left'
          let min = left ? end : start - 1
          let max = left ? start + 1 : end
          for (let i = 0; i < this.dragHeaders.length; i++) {
            if (i === end) {
              tempData.push(this.dragHeaders[start])
            } else if (i > min && i < max) {
              tempData.push(this.dragHeaders[left ? i - 1 : i + 1])
            } else {
              tempData.push(this.dragHeaders[i])
            }
          }
          this.dragHeaders = tempData
        },
        //选择项改变时候（返回当前选中的行）
        handleSelectionChange (selection) {
          this.$emit('rowSelectionChanged', selection)
        },
      }
    }
  </script>
   
  <style scoped>
    .btns-area {
      padding-left: 0px;
      text-align: left;
    }
    .table-height{
      height:  calc(100% - 60px)
    }
    .pub-table-cla{
      height:  calc(100% - 42px)
    }
    .pub-button-he{
      height: 30px !important;
    }
  </style>
  <!-- 原文链接：https://blog.csdn.net/one_dayR/article/details/103398164 -->