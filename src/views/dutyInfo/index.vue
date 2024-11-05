<template>
    <div class="duty-info">
        <div class="title" style="height: 50px">{{ moment(dateDay).format('YYYY-MM-DD') }} 值班人员表   <el-button type="text" size="medium" @click="displayStatus = !displayStatus">{{ displayStatus ? '隐藏日期' :'展开日期'}}</el-button></div>
        <div class="flex">
            <div class="date-day" :style="displayStatus ? 'display:block' : 'display:none'">
                <el-calendar v-model="dateDay" :first-day-of-week="7" >  </el-calendar>
            </div>
            <div class="flex-1  div-scr">
                  <div class="flex flex-w">
                      <div v-if="tableData.length == 0" style="flex: 1;display: flex; align-items: center; justify-content: center; color: #fff;">
                        暂无值班人员 
                        <!-- <el-button type="text" size="medium" @click="initData">去添加</el-button> -->
                      </div>
                      <el-card shadow="never" v-for="(item, index) in tableData" :key="index">
                        <div class="flex">
                            <div style="margin-right: 1rem;">
                                <el-avatar shape="square" :size="80" :src="squareUrl"></el-avatar>
                            </div>
                            <div class="info-title">
                                    <div class="title">{{ item.deptname }}</div>
                                    <div class="title">{{ item.odate }}</div>
                                    <div class="title">{{ item.name }}</div>
                                    <div class="title">{{ item.phone }}</div>
                                    <div :class="`title tagColor${item.schedule}`"> {{ ['', '白班', '夜班', '全职'][item.schedule] }}</div>
                            </div>
                        </div>
                      </el-card>
                  </div>
            </div>
        </div>
    </div>  
</template>

<script>
import moment from'moment'
    export default {
      name: 'home',
      data() {
        return {
          moment,
          dateDay: new Date(),
          // squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          squareUrl: require('@/assets/avatar.png'),
          displayStatus: true,
          params:{
            name: '',
            deptid: '',
            schedule: '',
            odate: moment().format('YYYY-MM-DD'),
            pageNum: 1,
            pageSize: 10,
          },
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
      mounted(){
        this.initData()
      },
      watch:{
        dateDay(val){
            this.params.odate = moment(val).format('YYYY-MM-DD')
            this.initData()
        }
      },
      methods: {
        initData(){
          this.$http.post('/beon/page', this.params).then(res => {
                if (res.code == 200){
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            })
        }
      }
  }
</script>
<style lang="scss" scoped>
.duty-info{

}
.flex-w{
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  >div{
    height: 120px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
}
.div-scr{
  overflow: auto;
  height: calc(100vh - 200px);
}
.card-title{
  font-size: 18px;
  text-align: center;
}
/deep/ .el-card__header{
  background-color: rgba(#409EFF, .2);
  color: #fff;
}
/deep/ .el-calendar{
  .el-button--mini{
    font-size: 18px;
  }
}
.title{
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  text-align: center;
}
.date-day{
  width: 700px;
  padding: 30px;
  border: 1px solid #ccc;
  font-size: 28px;
  --webkit--zoom:.6;
  --moz--zoom:.6;
  --o--zoom:.6;
  zoom:.6;
}
.info-title{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 300px;
  .title{
        font-size: 16px;
        padding:0 10px;
        font-weight: 400;
        color: #fff;
        display: flex;
        align-items: center;
        font-weight: 600;
  }
  .tagColor2{
     color: #409EFF;
  }
  .tagColor3{
     color: #E6A23C;
  }
}

</style>