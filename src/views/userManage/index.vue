<template>
  <div class="user-manage">
    <el-form :inline="true" :model="params" class="demo-form-inline" size="medium">
        <el-form-item label="名称：">
            <el-input v-model="params.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="员工编号：">
            <el-input v-model="params.number" placeholder="员工编号"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
            <el-select v-model="params.deptid" placeholder="部门" style="width: 120px;" >
                <el-option label="全部" value=""></el-option>
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in deptList" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="级别：">
            <el-select v-model="params.level" placeholder="级别"  style="width: 120px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="普通员工" :value="1"></el-option>
              <el-option label="领导" :value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="角色：">
            <el-select v-model="params.level" placeholder="角色"  style="width: 120px;">
              <el-option label="全部" value=""></el-option>
              <el-option :label="item.label" :value="item.value" v-for="(item, index) in rolesList" :key="index"></el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item>
          <div class="flex">
            <el-button type="primary" @click="initData">查询</el-button>
              <el-button type="primary" @click="addData">添加</el-button>
              <el-button type="primary" @click="onTableDuty">生成值班</el-button>
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
        </el-form-item>
    </el-form>
    <!-- <div>
      <el-button type="primary" size="medium" @click="initData">保存</el-button>
    </div> -->
    <div class="duty-content">
          <div>
              <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column prop="number"  label="员工编号">  </el-table-column>
                  <el-table-column prop="name" label="姓名" > </el-table-column>
                  <el-table-column prop="deptname"  label="部门"> </el-table-column>
                  <el-table-column prop="level"  label="级别">
                      <template slot-scope="scope">
                          <span v-if="scope.row.level == 1">普通员工</span>
                          <span v-if="scope.row.level == 2">中心领导</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="createtime" label="创建时间" :formatter="$changeTime.createTimeFn"></el-table-column>
                  <el-table-column label="操作" width="220">
                      <template slot-scope="scope">
                          <el-button size="medium" type="primary" @click="onTableView(scope.row)">编辑</el-button>
                          <el-button size="medium" type="danger" @click="onTableDel(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>
        </div>
          <div style="text-align: end;padding-top: 20px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.pageNum"
                :page-size="params.pageSize"
                :page-sizes="[10, 50, 100, 200]"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
         </div>
    </div>
    <el-dialog title="添加值班人员" :visible.sync="dialogVisible"  width="30%"  :before-close="handleClose" :append-to-body="true">
         <div>
              <el-form ref="dialogForm" :model="dialogForm" :rules="rules" label-width="100px" class="dialog-form app-main">
                  <el-form-item label="员工编号：" prop="number">
                      <el-input v-model="dialogForm.number" placeholder="员工编号"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名：" prop="name">
                      <el-input v-model="dialogForm.name" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="头像：" prop="phone" v-if="typeTitle == 'edit'">
                    <el-avatar shape="square" :size="120" :src="dialogForm.head"></el-avatar>
                  </el-form-item>
                  <el-form-item label="联系电话：" prop="mobile">
                      <el-input v-model="dialogForm.mobile" placeholder="联系电话"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号：" prop="phone">
                      <el-input v-model="dialogForm.phone" placeholder="手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="部门：" prop="deptid">
                      <el-select v-model="dialogForm.deptid" placeholder="部门"  style="width: 100%;" @change="deptSelect">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in deptList" :key="index"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="订阅：">
                      <el-select v-model="dialogForm.roleid" placeholder="订阅" @change="rileSelect" style="width: 100%;">
                          <!-- <el-option :label="item.label" :value="item.value" v-for="(item, index) in rolesList" :key="index"></el-option> -->
                          <el-option label="产品 1" :value="1"></el-option>
                          <el-option label="产品 2" :value="2"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="级别：" prop="level">
                          <el-radio-group v-model="dialogForm.level">
                              <el-radio :label="1">普通员工</el-radio>
                              <el-radio :label="2">中心领导</el-radio>
                          </el-radio-group>
                  </el-form-item>
                  <!-- <el-form-item label="排序：" prop="sort">
                      <el-input-number v-model="dialogForm.sort"></el-input-number>
                  </el-form-item> -->
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
    name: 'userManage',
    data() {
      return {
        moment,
        params:{
            name: '',
            deptid: '',
            number: '',
            level: '',
            roleid: '',
            pageNum: 1,
            pageSize: 10,

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
        rolesList:[
          {
            value: 1,
            label: '普通'
          },
          {
            value: 2,
            label: '管理员'
          }
        ],
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        loading: false,
        dialogVisible: false,
        typeTitle: '',
        dialogForm: {
            level: 1,
            deptid: '',
            deptname: '',
            name: '',
            number: '',
            roleid: '',
            rolename: '',
            head: sessionStorage.getItem('head'),
            phone: sessionStorage.getItem('phone'),
            mobile: sessionStorage.getItem('mobile'),
        },
        rules: {
          deptid:[
            { required: true, message: '请选择部门', trigger: 'change' },
          ],
          number:[
            { required: true, message: '请输入员工编号', trigger: 'blur' },
          ],
          level:[
            { required: true, message: '请选择级别', trigger: 'change' },
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          roleid: [
            { required: true, message: '请选择角色', trigger: 'change' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
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
          this.$http.post('/beon/user/page', this.params).then(res => {
              if (res.code == 200){
                  this.tableData = res.data.records;
                  this.total = res.data.total;
              }
          })
      },
      deptSelect(value){
          this.dialogForm.deptname = this.deptList.find(item => item.value == value).label;
      },
      rileSelect(value){
          this.dialogForm.rolename = this.rolesList.find(item => item.value == value).label;
      },
      addData(){
          this.dialogVisible = true;
          this.typeTitle = 'add';
          this.dialogForm = {
              level: 1,
              deptid: '',
              deptname: '',
              name: '',
              number: '',
              roleid: '',
              rolename: '',
              head: '',
              phone: '',
              mobile: '',
          }
        this.$refs.dialogForm.resetFields();
      },
      handleSizeChange(val){
        this.params.pageSize = val;
        this.initData()
      },
      handleCurrentChange(val){
        this.params.pageNum = val;
        this.initData();
      },
      handleClose(){
          this.dialogVisible = false;
      },
    
      onTableDel(row){
          this.$confirm(`是否确认删除？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$http.post(`/beon/user/del?id=${row.id}`).then(res => {
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
                if (this.typeTitle == 'add'){
                    this.$http.post('/beon/user/add', [this.dialogForm]).then(res => {
                      if (res.code == 200){
                        this.$notify.success({  title: '添加成功', });
                        this.initData();
                        this.dialogVisible = false;
                      } else {
                        this.$notify.error({  title: '添加失败', });
                      }
                  })
                }
                if (this.typeTitle == 'edit'){
                    this.$http.post('/beon/user/mod', this.dialogForm).then(res => {
                        if (res.code == 200){
                          this.$notify.success({  title: '编辑成功', });
                          this.initData();
                          this.dialogVisible = false;
                        } else {
                            this.$notify.error({  title: '编辑失败', });
                        }
                    })
                }
                
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
          this.$http.post('/beon/user/excel/improt', data).then(res => {
              if (res.code == 200){
                this.$notify.success({  title: '导入成功', });
                this.initData();
              } else {
                this.$notify.error({  title: '导入失败', });
              }
            }).catch(err => {
              this.$notify.error({  title: '导入失败', })
            });
      },
      onTableDuty(){
          this.$confirm(`是否确认生成值班？`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$http.post(`/beon/user/automatic`).then(res => {
                      if (res.code == 200){
                        this.$notify.success({  title: '生成值班成功', });
                        // this.initData();
                        // this.dialogVisible = false;
                      } else {
                        this.$notify.error({  title: '生成值班失败', });
                      }
                  }).catch(err => {
                      this.$notify.error({  title: err, });
                  })
              }).catch(err => {})
      },
      onTableView(row){
          this.dialogVisible = true;
          this.dialogForm = row;
          this.typeTitle = 'edit';
      },
      // 导出
      exportData(){
        this.$confirm(`是否确认下载模板？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$http.postFile('/beon/user/excel/out/template').then(res => {
                  const blob = new Blob([res.data], { type: "text/plain;charset=utf-8" });
                  saveAs(blob, `值班人员模板.xlsx`);
              }).catch(err => {
                  this.$notify.error({  title: '下载模板失败', });
              })
          }).catch(err => {})
      },
      // 上传头像
      handleAvatarSuccess(file) {
          this.dialogForm.head = URL.createObjectURL(file.raw);
      },
      // 上传头像
      beforeAvatarUpload(file) {
          // const isJPG = file.type === 'image/jpeg';
          // const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          // if (!isLt2M) {
          //   this.$message.error('上传头像图片大小不能超过 2MB!');
          // }
          // return isJPG && isLt2M;
      }
  }
}
</script>
<style lang="scss" scoped>
.user-manage{
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
}
</style>