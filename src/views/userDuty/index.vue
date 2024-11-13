<template>
    <div class="user-duty flex">
        <div class="content-left">
            <el-calendar v-model="dateDay" :first-day-of-week="7" >
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <div :class="data.isSelected ? 'is-selected' : ''"  @click.self="calenderChange(date, data)">
                        <!-- {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}} -->
                          <div>
                                {{ dataDayListFn(data) }} 
                          </div>
                          <!-- <div v-if="noticeStatus(data.day)" > -->
                        <div style="height: 40px; overflow: auto;">
                            <template v-for="(item, index) in tableData">
                                <div v-if="item.odate == data.day" :key="index">
                                    <el-button size="mini" class="share-button" @click="noticeApplyClick(item)" icon="el-icon-edit-outline" type="success" circle></el-button>
                                    <el-button size="mini" class="share-button" @click="noticeClick(item)" icon="el-icon-s-check" type="warning" circle></el-button>
                                    <!-- <el-button size="mini" v-if="item.applyfor == 2"  class="share-button" @click="noticeApplyClick(item)" icon="el-icon-edit-outline" type="success" circle></el-button>
                                    <el-button size="mini" v-if="item.examine == 2"  class="share-button" @click="noticeClick(item)" icon="el-icon-s-check" type="warning" circle></el-button> -->
                                    <el-button type="text" style="margin-left: 20px;" @click.stop="shiftClick(item)">调班</el-button>
                                </div>
                            </template>
                        </div>
                    </div> 
                </template>
            </el-calendar>
        </div>
        <div class="content-right">
            <div class="flex flex-c">
                <el-button style="flex: 1" type="primary" @click="addList"> 添加日程 </el-button>
                <div class="flex" style="justify-content: space-between; padding: 20px 0;">
                    <span>日程列表</span>
                    <span>{{ moment(dateDay).format('YYYY-MM-DD')  }}</span>
                </div>
            </div>
            <div class="flex flex-c list-box">
                <div class="list" v-for="(item,index) in listData" :key="index">
                    <div class="title">
                        <span><i :type="['', 'primary', 'warning', 'danger'][item.state]"></i>{{ item.title }}</span>
                        <el-tag :type="['', 'primary', 'warning', 'danger'][item.state]">{{ item.timefor}}</el-tag>
                    </div>
                    <div class="content"> {{ item.content }} </div>
                    <el-button size="mini" type="danger" class="delete-list" @click="deleteList(item)">删除</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="添加日程" :visible.sync="dialogVisible"  width="30%"  :before-close="handleClose" :append-to-body="true">
           <div class="app-main">
                <el-form ref="dialogForm" :model="dialogForm" label-width="100px" class="dialog-form">
                    <el-form-item label="标题：">
                        <el-input v-model="dialogForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-radio-group v-model="dialogForm.state">
                            <el-radio :label="1"> 一般 <i type="primary"></i></el-radio>
                            <el-radio :label="2"> 重要 <i type="warning"></i></el-radio>
                            <el-radio :label="3"> 紧急 <i type="danger"></i> </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="日期时间：">
                        <el-date-picker type="date" placeholder="选择日期" v-model="dialogForm.datefor"  value-format="yyyy-MM-dd" style="width: 60%;"></el-date-picker>
                        <el-time-select 
                            placeholder="选择时间" 
                            :picker-options="{
                                start: '08:30',
                                step: '00:15',
                                end: '18:30'
                            }" 
                            v-model="dialogForm.timefor" 
                            value-format="H-mm" 
                            style="width: 40%;">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item label="日程内容：">
                        <el-input type="textarea" v-model="dialogForm.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClose">取消</el-button>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </el-form-item>
                </el-form>
           </div>
        </el-dialog>
        <el-dialog title="调班列表" :visible.sync="dialogVisibleShiftList" top="5%"  width="50%" class="app-main"  :before-close="handleClose" :append-to-body="true">
           <div>
            <el-form ref="shiftParams" :model="shiftParams" :inline="true" size="small" class="dialog-form">
                    <el-form-item label="名称：">
                        <el-input v-model="shiftParams.name" style="width: 120px;"></el-input>
                    </el-form-item>
                    <el-form-item label="部门：">
                        <el-select v-model="shiftParams.deptid" placeholder="部门"  style="width: 120px;">
                            <el-option :label="item.label" :value="item.value" v-for="(item, index) in deptList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间：">
                        <el-date-picker type="date" placeholder="选择日期" v-model="shiftParams.odate"  value-format="yyyy-MM-dd" style="width: 150px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="initShiftList">确定</el-button>
                    </el-form-item>
                </el-form>
           </div>
            <div style="overflow: auto; height: 500px;">
                <div class="flex shift-list" v-for="(item, index) in shiftList" :key="index">
                    <div style="margin-right: 1rem;">
                        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
                    </div>
                    <div class="info-title">
                            <div class="title">{{ item.deptname }}</div>
                            <div class="title">{{ item.odate }}</div>
                            <div class="title">{{ item.name }}</div>
                            <div class="title">{{ item.phone }}</div>
                            <div class="title"> <el-tag>{{ ['', '白班', '夜班', '全职'][item.schedule] }}</el-tag></div>
                            <el-button  size="small" type="primary" @click="shiftParamsClick(item)">确定</el-button>
                    </div>
                </div>
           </div>
           <div style="text-align: end;padding-top: 20px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="shiftParams.pageNum"
                    :page-size="shiftParams.pageSize"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
                </el-pagination>
           </div>
        </el-dialog>
        <el-dialog title="调班内容" :visible.sync="dialogVisibleShiftInfo"  width="30%"  :before-close="handleClose" :append-to-body="true">
           <div class="app-main">
                <el-form ref="shiftForm" :model="shiftForm" label-width="100px" class="dialog-form">
                    <div class="flex flex-w app-main" style="margin: 0 0 1rem 1rem">
                      <el-card shadow="never">
                        <div class="flex">
                            <div style="margin-right: 1rem;">
                                <el-avatar shape="square" :size="80" :src="pappInfo.head"></el-avatar>
                            </div>
                            <div class="info-title">
                                    <div class="title">{{ pappInfo.deptname }}</div>
                                    <div class="title">{{ pappInfo.odate }}</div>
                                    <div class="title">{{ pappInfo.name }}</div>
                                    <div class="title">{{ pappInfo.phone }}</div>
                                    <div class="title"> <el-tag>{{ ['', '白班', '夜班', '全职'][pappInfo.schedule] }}</el-tag></div>
                            </div>
                        </div>
                      </el-card>
                  </div>
                    <el-form-item label="班次：">
                        <el-select v-model="shiftForm.schedule" placeholder="值班班次"  style="width: 160px;">
                        <el-option label="全职" :value="3"></el-option>
                        <el-option label="白班" :value="1"></el-option>
                        <el-option label="夜班" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="shiftForm.notes"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogVisibleShiftInfo = false">取消</el-button>
                        <el-button type="primary" @click="shiftSubmit">确定</el-button>
                    </el-form-item>
                </el-form>
           </div>
        </el-dialog>

        <el-dialog :title="noticeType == 'examine' ? '审核记录' : '申请记录'" :visible.sync="dialogVisibleNotice"  width="40%" :modal-append-to-body="false" :before-close="handleClose"  :append-to-body="false">
           <div class="flex flex-w app-main">
                <div v-for="(item, index) in noticeList" :key="index"  style=" width:100%;margin: 0 0 1rem 1rem">
                    <el-card shadow="never">
                        <div class="">
                            <div class="info-title" style="flex-direction: column">
                                    <div class="title">申请人：{{ item.applyname }}</div>
                                    <div class="title" style="margin-top: 1rem;">申请人班次： <el-tag>{{ ['', '白班', '夜班', '全职'][item.schedule] }}</el-tag></div>
                                    <div class="title"  style="margin-top: 1rem;">申请人备注：{{ item.notes }}</div>
                            </div>
                            <div  style="margin-top: 1rem; text-align: center" v-if="noticeType == 'examine'">
                                <el-button type="danger" size="small" @click="consentClick(item, 3)">拒绝</el-button>
                                <el-button type="primary" size="small" @click="refuseClick(item, 2)">同意</el-button>
                            </div>
                            <div  style="margin-top: 1rem; text-align: center" v-if="noticeType == 'apply'">
                                <span class="title">{{ item.state == 2 ? '已同意' : item.state == 3 ? '已拒绝' : '未审核' }}</span>
                            </div>
                        </div>
                    </el-card>
                </div>
                <!-- <el-form ref="shiftForm" :model="shiftForm" label-width="100px" class="dialog-form">
                    <el-form-item>
                        <el-button @click="dialogVisibleShiftInfo = false">取消</el-button>
                        <el-button type="primary" @click="shiftSubmit">确定</el-button>
                    </el-form-item>
                </el-form> -->
           </div>
        </el-dialog>
      
    </div>  
</template>

<script>
import moment from'moment'

    export default {
      name: 'home',
      data() {
        return {
            dateDay: new Date(),
            moment,
            dialogVisible: false,
            dialogVisibleShiftList: false,
            dialogVisibleShiftInfo: false,
            dialogVisibleNotice: false,
            notifyBox: null,
            squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            dialogForm:{
                title: '',
                datefor: '',
                timefor: "10: 00",
                content: '',
                state: 1,
                number: sessionStorage.getItem('number') || '',
            },
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
          noticeType: '',
          dataDayList: [],
          shiftParams:{
                name: '',
                deptid: '',
                schedule: '',
                odate: moment(this.dateDay).format('YYYY-MM-DD'),
                pageNum: 1,
                pageSize: 10
            },
            pappInfo:{},
            shiftForm: {

            },
            listData:[
                {
                    title: '会议中心',
                    date: new Date(),
                    timefor: "10: 00",
                    content: '参加会议',
                    state: 1,
                },
                {
                    title: '503会议室',
                    date: new Date(),
                    timefor: "14: 20",
                    content: '产品设计会议产品设计会议产品设计会议产品设计会议产品设计会议产品设计会议产品设计会议产品设计会议产品设计会议产品设计会议产品设计会议',
                    state: 2,
                },
                {
                    title: '101会议室',
                    date: new Date(),
                    timefor: "17: 00",
                    content: '产品设计会议',
                    state: 3,
                },
            ],
            shiftList: [],
            tableData: [
                {
                    odate: '2024-11-05',
                    timefor: '10:00',
                    content: '产品设计会议',
                    state: 1,
                },
                {
                    odate: '2024-11-05',
                    timefor: '10:00',
                    content: '产品设计会议',
                    state: 1,
                },
                {
                    odate: '2024-11-05',
                    timefor: '10:00',
                    content: '产品设计会议',
                    state: 1,
                },
            ],
            noticeList: [],
            total: 0,
            loading: false,
        }
      },
      watch: {
        dateDay: {
            handler(val){
                this.initList(val)
                this.dataDayList = []
            },
            deep: true,
        },
        dataDayList: {
            handler(newVal, oldVal){
                if (newVal.length == 42){
                    this.initData(newVal[0], newVal[41])
                }
            },
        }
      },
      mounted(){
        this.initList(this.dateDay)
        // this.initShiftList()
      },
      methods: {
        noticeStatus(day){
            return this.tableData.some(item => item.odate == day)
        },
        initData(odatestar = '', odateend = ''){
            let params = {
                name: sessionStorage.getItem('username') || '',
                number: sessionStorage.getItem('number') || '',
                roleid: sessionStorage.getItem('roleid') || '',
                odatestar,
                odateend,
                // rolename: sessionStorage.getItem('rolename') || '',
                deptid: '',
                schedule: '',
                odate: '',
            }
            this.$http.post('/beon/list', params).then(res => {
                if (res.code == 200){
                    this.tableData = res.data;
                    // this.total = res.data.total;
                }
            })
        },
        // 日程列表
        initList(date){
            let params = {
                number: sessionStorage.getItem('number') || '',
                dateforstar: moment(date).format('YYYY-MM-DD'),
                dateforend: moment(date).format('YYYY-MM-DD'),
            }
            this.$http.post('/beon/trip/list', params).then(res => {
                if (res.code == 200){
                    this.listData = res.data;
                    // this.total = res.data.total;
                }
            })
        },
        // 调班列表
        initShiftList(){
            this.$http.post('/beon/page', this.shiftParams).then(res => {
                if (res.code == 200){
                    this.shiftList = res.data.records;
                    this.total = res.data.total;
                }
            })
        },
        calenderChange(date, data){
            // console.log(date, data);
            this.$nextTick(() => {
                this.initList(data.day)
            })
        },
        addList(){
            this.dialogVisible = true
            this.$nextTick(() => {
                this.dialogForm = {
                    title: '',
                    datefor: moment(this.dateDay).format('YYYY-MM-DD') ,
                    timefor: "10: 00",
                    content: '',
                    state: 1,
                    number: sessionStorage.getItem('number') || '',
                }
                this.$refs.dialogForm.resetFields()
            })
        },
        handleClose(){
            this.dialogVisible = false
            this.dialogVisibleShiftList = false
            this.dialogVisibleNotice = false
            this.dialogVisibleShiftInfo = false
            // if (this.notifyBox) this.notifyBox.close()
        },
        // 调班
        shiftClick(item){
            this.dialogVisibleShiftList = true
            // let data = this.tableData.find(item => item.odate == day)
            this.shiftForm.applybeonid = item.id
            this.shiftForm.applyid = sessionStorage.getItem('number') || ''
            this.shiftForm.applyname = sessionStorage.getItem('username') || ''
            this.shiftForm.odate = item.odate
            this.shiftForm.state = 1
            this.initShiftList()
            // this.initList(this.dateDay)
        },
        handleSizeChange(val){
          this.shiftForm.pageSize = val;
          this.initShiftList()
        },
        handleCurrentChange(val){
          this.shiftForm.pageNum = val;
          this.initShiftList()
        },
        // 获取日历 日期
        dataDayListFn(data){
            this.$nextTick(() => {
                if (!this.dataDayList.includes(data.day))  this.dataDayList.push(data.day)
            })
            return data.day.split('-').slice(1).join('-') 
        },
        // 审核记录
        noticeClick(row){
            this.noticeType = 'examine'
            this.dialogVisibleNotice = true
            this.noticeList = []
            // this.$http.post(`/beon/examine/log?id=${row.id}`).then(res => {
            //     if (res.code == 200){
            //         this.dialogVisibleNotice = true
            //         this.noticeList = res.data || []
            //         // this.pappInfo = res.data
            //     }
            // })
        },
        // 申请记录
        noticeApplyClick(row){
            this.noticeType = 'apply'
            this.dialogVisibleNotice = true
            this.noticeList = []
            // this.$http.post(`/beon/apply/log?id=${row.id}`).then(res => {
            //     if (res.code == 200){
            //         this.dialogVisibleNotice = true
            //         this.noticeList = res.data || []
            //         // this.pappInfo = res.data
            //     }
            // })
        },
        consentClick(row, state){
            this.$http.post('/beon/judge', {id: row.id, state: 2}).then(res => {
                if (res.code == 200){
                    this.handleClose()
                    this.initData()
                } else {
                    this.$notify.error({  title: '操作失败', });
                }
            })        
        },
        deleteList(row){
            this.$confirm(`是否确认删除？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(`/beon/trip/del?id=${row.id}`).then(res => {
                    if (res.code == 200){
                      this.$notify.success({  title: '删除成功', });
                      this.initList(this.dateDay)
                    } else {
                      this.$notify.error({  title: '删除失败', });
                    }
                })
            }).catch(err => {})
        },
        onSubmit(){
            this.$refs.dialogForm.validate((valid) => {
                if (valid) {
                    // this.dialogVisible = false
                    // this.listData.push(this.dialogForm)
                    this.$http.post('/beon/trip/add', this.dialogForm).then(res => {
                        if (res.code == 200){
                            this.dialogVisible = false
                            this.$notify.success({  title: '添加日程成功', });
                            this.initList(this.dateDay)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        shiftParamsClick(item){
            this.dialogVisibleShiftInfo = true
            this.shiftForm.papplyid = item.number
            this.shiftForm.papplyname = item.name
            this.shiftForm.papplybeonid = item.id
            this.pappInfo = {...item}
        },
        shiftSubmit(){
            this.$confirm(`是否确认调班？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/beon/replace', this.shiftForm).then(res => {
                    if (res.code == 200){
                      this.$notify.success({  title: '调班申请已提交', });
                    } else {
                      this.$notify.error({  title: '调班申请失败', });
                    }
                })
            }).catch(err => {})
        },
      }
  }
</script>
<style lang="scss" scoped>
.user-duty{
    width: 100%;
    // background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    .content-left{
        width: 65%;
        padding: 0 20px;
    }
    .content-right{
        flex: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
        background-color: rgba(#f2f8fe, 0);
    }
    .list-box{
        height: 500px;
        overflow-y: auto;
    }
    .list{
        background-color: var(--border-color);
        // background-color: rgb(97, 124, 235);
        border-radius: 10px;
        margin: 10px 0;
        padding: 20px;
        position: relative;
        &:hover{
           .delete-list{
                display: block;
            }
        }
        .title{
            display: flex;
            justify-content: space-between;
            // color: #333;
            i{
                display: inline-block;
                width: 15px;
                height: 15px;
                background-color: #409eff;
                border-radius: 50%;
                margin-right: 10px;
            }
            i[type="primary"]{
                background-color: #409eff;
            }
            i[type="warning"]{
                background-color: #e6a23c;
            }
            i[type="danger"]{
                background-color: #f56c6c;
            }
        }
        .date{
            font-size: 16px;
            // color: #606266;
        }
        .content{
            width: 70%;
            margin-top: 20px;
            font-size: 14px;
            // color: #606266;
        }
        .delete-list{
            display: none;
            position: absolute;
            right: 20px;
            bottom: 20px;
        }
    }
   
}
.info-title{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.shift-list{
    padding: 20px;
    border: #ccc 1px solid;
    border-radius: 10px;
    margin-bottom: 20px;

    &:hover{
        border-color: #409eff;
    }
}
.dialog-form{
    i{
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        top: 3px;
    }
    i[type="primary"]{
        background-color: #409eff;
    }
    i[type="warning"]{
        background-color: #e6a23c;
    }
    i[type="danger"]{
        background-color: #f56c6c;
    }
    .el-radio{
        color: #fff;
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
        }
    }
    // /deep/ .el-form-item__content{
    //     display: flex;
    //     align-items: center;
    // }
    // .el-radio-group{
    //     display: flex;
    //     justify-content: space-between;
    // }
    // .el-radio{
    //     color: #fff;
    //     display: flex;
    // }
    // /deep/ .el-radio__label{
    //     display: flex;
    //     align-content: center;
    // }
}
</style>