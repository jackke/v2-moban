<template>
  <div class="duty-manage">
    <div class="title" style="height: 50px; text-align: center;">
          值班列表
          <el-switch v-model="scrollOptions.autoPlay" inactive-color="#F56C6C" @change="palyClick" style="margin-left: 20px;"> </el-switch>
          <!-- <el-button type="text" size="medium" v-if="tableStatus" @click="palyClick">{{ scrollOptions.autoPlay ? '暂停' :'开始'}} </el-button> -->
      </div>
    <div class="flex flex-c flex-1" :style="`${scrollOptions.autoPlay ? 'overflow: hidden' : 'overflow: auto'}`">
          <div v-html="headerHtml" class="header-html"></div>
          <VueSeamlessScroll ref="seamleScroll" class="seamlessScroll" :style="`${scrollOptions.autoPlay ? 'overflow: hidden' : ''}`" :data="tableData" :class-option="scrollOptions">
              <el-table
                  :data="tableData"
                  :span-method="objectSpanMethod"
                  style="width: 100%">
                  <el-table-column prop="odate"  label="值班日期">  </el-table-column>
                  <el-table-column prop="number" label="员工编号"> </el-table-column>
                  <el-table-column prop="name" label="姓名"> </el-table-column>
                  <el-table-column prop="deptname"  label="部门"> </el-table-column>
                  <el-table-column prop="mobile"  label="联系电话"> </el-table-column>
                  <!-- <el-table-column prop="level"  label="级别">
                      <template slot-scope="scope">
                          <span v-if="scope.row.level == 1">普通员工</span>
                          <span v-if="scope.row.level == 2">中心领导</span>
                      </template>
                  </el-table-column> -->
                  <el-table-column prop="schedule"  label="班次">
                      <template slot-scope="scope">
                          <span v-if="scope.row.schedule == 1">白班</span>
                          <span v-if="scope.row.schedule == 2">夜班</span>
                          <span v-if="scope.row.schedule == 3">全职</span>
                      </template>
                  </el-table-column>
              </el-table>
          </VueSeamlessScroll>
      </div>
  </div>  
</template>

<script>
import moment from 'moment';

import VueSeamlessScroll from "vue-seamless-scroll";

  export default {
    name: 'dutyManage',
    data() {
      return {
        moment,
        scrollOptions:{
            step: 1,
            autoPlay: false, // 是否自动播放
            limitMoveNum: 2, // 开始无缝滚动的最小数据量
            hoverStop: true, // 是否开启鼠标悬停stop
            openTouch: true, 
            direction: 1, // 0向下 1向上 2向左 3向右
            openWatch: true, // 开启数据实时监控刷新dom
            singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        },
        scrollHeiht: 0,
        squareUrl: require('@/assets/avatar.png'),
        headerHtml: '',
        deptList:[
          {
            value: 1,
            label: '环境室'
          },
          {
            value: 2,
            label: '台海室'
          }
        ],
        spanArr:[],
        tableData: [
            {
              deptid: 1,
              odate: '2022-01-01',
              schedule: 1,
              name: '张三',
              phone: '13512345678',
              sort: 1,
              head: '',
              notes: '',
              roleid: '',
              rolename: '',
            }
        ],
        total: 0,
        loading: false,
      }
    },
    components:{
      VueSeamlessScroll
    },
    created(){

    },
    mounted(){
      this.initData()
      this.getTableHeader()
    },
    methods: {
      initData(){
          // this.$http.post('/beon/page', this.formInline).then(res => {
          //     if (res.code == 200){
          //         this.tableData = res.data.records;
          //         this.total = res.data.total;
          //     }
          // })
          let params = {
            name: '',
            deptid: '',
            schedule: '',
            // odate: moment().format('YYYY-MM-DD'),
            odatestar: moment().format('YYYY-MM-DD'),
            odateend: moment().add(7, 'days').format('YYYY-MM-DD'),
            pageNum: 1,
            pageSize: 9999,
        }
          this.$http.post('/beon/page', params).then(res => {
              if (res.code == 200){
                  let arr = res.data.records;
                  this.tableData = arr.sort((a, b) => new Date(a.odate) - new Date(b.odate));
                  this.spanArr = this.$reg._getSpanArr(this.tableData, 'odate');
                  // console.log(this.tableData);
                  this.total = res.data.total;
              }
          })
      },
      palyClick(val){
        this.scrollOptions.autoPlay = val
        if (this.scrollOptions.autoPlay){
          this.$refs.seamleScroll._startMove();
        } else {
          this.$refs.seamleScroll._stopMove();
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          };
        }
      },
      getTableHeader(){
        this.$nextTick(() => {
          let html = document.querySelector('.el-table__header-wrapper')
          this.headerHtml = `<div class="el-table">${html.innerHTML}</div>`
          html.style.display = 'none'
        })
      },
    }
}
</script>
<style lang="scss" scoped>
.duty-manage{
// background-color: #fff;
display: flex;
flex-direction: column;
height: 100%;
/deep/ .el-switch__core{
      border: 1px solid #fcfcfc !important;
      &::after{
        // background-image: linear-gradient(to right, #60c7ed, #00d9e9, #fff, #00d9e9, #60c7ed);
        background-color: #fcfcfc;
        box-shadow: 0 0 10px #63C7ED, /* 内发光 */
                  0 0 50px #63C7ED,  /* 外发光 */
                  0 0 20px rgba(#7CD5F7, 0.5); /* 次级发光 */
          animation: glow 1s ease-in-out infinite alternate;
      }
  }
  .header-html{
    background-color: #2d6097;
    position: relative;
    z-index: 5;
  }
}
@keyframes glow {
  from {
    box-shadow: 0 0 10px #63C7ED,
                0 0 50px #63C7ED,
                0 0 20px rgba(#7CD5F7, 0.5);
  }
  to {
    box-shadow: 0 0 20px #63C7ED,
                0 0 60px #63C7ED,
                0 0 20px rgba(#7CD5F7, 0.8);
  }
}
</style>