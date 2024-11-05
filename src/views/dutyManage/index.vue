<template>
    <div class="duty-manage">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
          <el-form-item label="名称：">
            <el-input v-model="formInline.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="部门：">
            <el-select v-model="formInline.deptid" placeholder="部门" >
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in deptList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班次：">
                <el-select v-model="formInline.schedule" placeholder="值班班次"  style="width: 160px;">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="全职" :value="3"></el-option>
                  <el-option label="白班" :value="1"></el-option>
                  <el-option label="夜班" :value="2"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="formInline.odate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="flex">
              <el-button type="primary" @click="initData">查询</el-button>
                <el-button type="primary" @click="addData">添加</el-button>
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="#"
                    style="margin: 0 10px;"
                    :on-change="handleSuccess"
                    :show-file-list= "false"
                    :auto-upload="false">
                    <el-button slot="trigger" type="primary">导入</el-button>
                </el-upload>
                <el-button type="primary" @click="exportData">下载模板</el-button>
            </div>
            <!-- <el-button type="primary" @click="importData">导入</el-button> -->
          </el-form-item>
      </el-form>
      <!-- <div>
        <el-button type="primary" size="medium" @click="initData">保存</el-button>
      </div> -->
      <div class="duty-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
          <div class="duty-content-form">
            <el-card shadow="always" v-for="(item, index) in tableData" :key="index">
                <div class="flex">
                    <div style="margin-right: 20px;">
                      <el-avatar shape="square" :size="80" :src="squareUrl"></el-avatar>
                    </div>
                    <div>
                      <div>
                          <el-form-item>
                            <el-select v-model="item.deptid" placeholder="部门" style="width: 120px;">
                              <el-option :label="item.label" :value="item.value" v-for="(item, index) in deptList" :key="index"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item>
                            <el-date-picker v-model="item.odate" type="date"  placeholder="选择日期"  style="width: 160px;">  </el-date-picker>
                          </el-form-item>
                          <el-form-item>
                              <el-select v-model="item.schedule" placeholder="值班班次"  style="width: 120px;">
                                <el-option label="全职" :value="3"></el-option>
                                <el-option label="白班" :value="1"></el-option>
                                <el-option label="夜班" :value="2"></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                      <div>
                        <el-form-item>
                          <el-input v-model="item.name" placeholder="名称"  style="width: 120px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input v-model="item.phone" placeholder="联系电话"  style="width: 160px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input-number v-model="item.sort" style="width: 120px;"></el-input-number>
                        </el-form-item>
                        <!-- <el-form-item>
                          <div>
                            <el-button type="primary" size="medium" @click="dataMod">保存</el-button>
                            <el-button type="danger" size="medium" @click="dataDel">删除</el-button>
                          </div>
                        </el-form-item> -->
                      </div>
                      <div>
                          <el-button type="primary" size="medium" @click="dataMod(item)">保存</el-button>
                          <el-button type="danger" size="medium" @click="dataDel(item)">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-card>
          </div>
            <div style="text-align: end;padding-top: 20px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="formInline.pageNum"
                  :page-size="formInline.pageSize"
                  :page-sizes="[10, 50, 100, 200]"
                  layout="total, sizes, prev, pager, next"
                  :total="total">
              </el-pagination>
           </div>
        </el-form>
      </div>
      <el-dialog title="添加值班人员" :visible.sync="dialogVisible"  width="30%"  :before-close="handleClose" :append-to-body="true">
           <div>
                <el-form ref="dialogForm" :model="dialogForm" :rules="rules" label-width="100px" class="dialog-form app-main">
                    <el-form-item label="部门：" prop="deptid">
                        <el-select v-model="dialogForm.deptid" placeholder="部门"  style="width: 100%;" @change="deptSelect">
                          <el-option :label="item.label" :value="item.value" v-for="(item, index) in deptList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间：" prop="odate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="dialogForm.odate"  value-format="yyyy-MM-dd" style="width: 100%;"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="班次：" prop="schedule">
                        <el-select v-model="dialogForm.schedule" placeholder="值班班次" style="width: 100%;">
                          <el-option label="全职" :value="3"></el-option>
                          <el-option label="白班" :value="1"></el-option>
                          <el-option label="夜班" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="dialogForm.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="phone">
                        <el-input v-model="dialogForm.phone" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="排序：" prop="sort">
                        <el-input-number v-model="dialogForm.sort"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleClose">取消</el-button>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </el-form-item>
                </el-form>
           </div>
        </el-dialog>
    </div>  
</template>

<script>
import moment from 'moment';
import { saveAs } from 'file-saver' // 将数据生成文件

    export default {
      name: 'dutyManage',
      data() {
        return {
          moment,
          formInline:{
              name: '',
              deptid: '',
              schedule: '',
              odate: moment().format('YYYY-MM-DD'),
              pageNum: 1,
              pageSize: 10,
              userid: +sessionStorage.getItem('userId') || '',

          },
          squareUrl: require('@/assets/avatar.png'),
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
          pageSize: 10,
          pageNum: 1,
          loading: false,
          dialogVisible: false,
          dialogForm: {
            schedule: '',
            deptid: '',
            deptName: '',
            name: '',
            odate: '',
            phone: '',
            head: '',
            notes: '',
            roleid: '',
            rolename: '',
            sort: 1,
            userid: '',
          },
          rules: {
            deptid:[
              { required: true, message: '请选择部门', trigger: 'change' },
            ],
            odate:[
              { required: true, message: '请选择日期', trigger: 'change' },
            ],
            schedule:[
              { required: true, message: '请选择班次', trigger: 'change' },
            ],
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入联系电话', trigger: 'blur' },
              { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
            ],
          }   
        }
      },
      created(){

      },
      mounted(){
        this.initData()
      },
      methods: {
        initData(){
            this.$http.post('/beon/page', this.formInline).then(res => {
                if (res.code == 200){
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                }
            })
        },
        deptSelect(value){
            this.dialogForm.deptname = this.deptList.find(item => item.value == value).label;
        },
        addData(){
            this.dialogVisible = true;
            this.dialogForm.odate = moment().format('YYYY-MM-DD')
            this.dialogForm.userid = sessionStorage.getItem('userId') || ''; // 用户id
            this.dialogForm.roleid = sessionStorage.getItem('roleid') || ''; // 角色id
            this.dialogForm.rolename = sessionStorage.getItem('rolename') || ''; // 角色名称
            this.dialogForm.head = sessionStorage.getItem('head') || ''; // 头像
        },
        handleSizeChange(val){
          this.formInline.pageSize = val;
          this.initData()
        },
        handleCurrentChange(val){
          this.formInline.pageNum = val;
          this.initData();
        },
        handleClose(){
            this.dialogVisible = false;
        },
        dataMod(Row){
          let data = {
            ...Row
          }
            this.$http.post('/beon/mod', data).then(res => {
                if (res.code == 200){
                  this.$notify.success({  title: '保存成功', });
                  this.initData();
                }
            })
        },
        dataDel(row){
            this.$confirm(`是否确认删除？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(`/beon/del?id=${row.id}`).then(res => {
                    if (res.code == 200){
                      this.$notify.success({  title: '删除成功', });
                      this.initData()
                    } else {
                      this.$notify.error({  title: '删除失败', });
                    }
                })
            }).catch(err => {})
            
        },
        onSubmit(){
          this.$refs.dialogForm.validate((valid) => {
              if (valid) {
                  this.$http.post('/beon/add', [this.dialogForm]).then(res => {
                      if (res.code == 200){
                        this.$notify.success({  title: '添加成功', });
                        this.initData();
                        this.dialogVisible = false;
                      } else {
                        this.$notify.error({  title: '添加失败', });
                      }
                  })
              } else {
                  console.log('error submit!!');
                  return false;
              }
          })
        },
        handleSuccess(file, fileList){
          // console.log(file, fileList, 'response, file, fileList');
            let data = new FormData()
            data.append('file', file.raw)
            this.$http.post('/beon/excel/improt', data).then(res => {
                if (res.code == 200){
                  this.$notify.success({  title: '导入成功', });
                  this.initData();
                  // this.dialogVisible = false;
                } else {
                  this.$notify.error({  title: '导入失败', });
                }
              }).catch(err => {
                this.$notify.error({  title: '导入失败', })
              });
        },
        // 导出
        exportData(){
          this.$confirm(`是否确认下载模板？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.postFile('/beon/excel/out/template?cemetery=1').then(res => {
                    const blob = new Blob([res.data], { type: "text/plain;charset=utf-8" });
                    saveAs(blob, `模板.xlsx`);
                }).catch(err => {
                    this.$notify.error({  title: '下载模板失败', });
                })
            }).catch(err => {})
        }
      }
  }
</script>
<style lang="scss" scoped>
.duty-manage{
  // background-color: #fff;
  padding: 20px;
    .duty-content{
      margin-top: 20px;
    }
    .duty-content-form{
      display: flex;
      flex-wrap: wrap;
      >div{
        margin-right: 20px;
        margin-bottom: 20px;
      }
    }
    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    /deep/ .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
    /deep/ .el-form-item__label{
        color: #fff;
    }
}
</style>