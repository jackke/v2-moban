<template>
  <div class="productManage">
      <!-- 头部 -->
      <div class="flex flex-sb head">
          <div>
              <el-form ref="form" :model="form" :inline="true" size="mini">
                  <el-form-item label="起报时间:">
                    <el-date-picker
                        style="width: 150px;"
                        v-model="form.value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="更新时次:">
                      <el-radio-group  v-model="form.choose">
                          <el-radio :label="1">08</el-radio>
                          <el-radio :label="2">20</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="预报时段:">
                    <el-time-picker
                        style="width: 200px;"
                        is-range
                        v-model="form.value2"
                        range-separator="～"
                        placeholder="选择时间范围">
                    </el-time-picker>
                  </el-form-item>
                  <el-form-item label="预报背景场:">
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  </el-form-item>
              </el-form>
          </div>
          <div>
              <el-button size="mini"  type="text"  @click="onSubmit">产品生成记录</el-button>
              <el-button size="mini" type="warning" icon="el-icon-refresh" @click="downloadFile">获取上次</el-button>
              <el-button size="mini" type="primary" icon="el-icon-download" @click="onSubmit" :loading="loadingStatus">生成</el-button>
          </div>
      </div>
      <!-- 内容 -->
       <div class="content">
            <!-- 中间地图 -->
            <div class="map">
                <div id="map"></div>
                <div class="map-left">
                    <div>
                        <i class="el-icon-s-home"></i>
                        <span>中心</span>
                    </div>
                    <div>
                        <i class="el-icon-edit"></i>
                        <span>画笔</span>
                    </div>
                    <div>
                        <i class="el-icon-document-copy"></i>
                        <span>融合</span>
                    </div>
                    <div>
                        <i class="el-icon-aim"></i>
                        <span>权重</span>
                    </div>
                    <div>
                        <i class="el-icon-copy-document"></i>
                        <span>复制</span>
                    </div>
                    <div>
                        <i class="el-icon-folder-opened"></i>
                        <span>保存</span>
                    </div>
                    <div>
                        <i class="el-icon-s-help"></i>
                        <span>解析</span>
                    </div>

                </div>
            </div>
            <!-- 右侧内容 -->
            <div class="right-content">
                <el-form ref="dataParams" :model="dataParams" size="small"  label-width="100px">
                    <!-- <el-form-item label="预警类型:">
                          <el-radio-group  v-model="dataParams.choose">
                              <el-radio :label="1">首发</el-radio>
                              <el-radio :label="2">继续发布</el-radio>
                              <el-radio :label="2">升级</el-radio>
                              <el-radio :label="2">解除</el-radio>
                          </el-radio-group>
                    </el-form-item> -->
                    <div style="display: flex;">
                          <el-form-item label="预警标题:">
                            <el-input v-model="dataParams.title" style="width: 180px;" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="预警期数:">
                          2024年 第 <el-input v-model="dataParams.number" style="width: 50px;"></el-input> 期
                        </el-form-item>
                    </div>
                    <div style="display: flex;">
                          <el-form-item label="文件名称:">
                              <el-input v-model="dataParams.fileName" style="width: 180px;" placeholder="请输入文件名称"></el-input>
                          </el-form-item>
                          <el-form-item label="文件类型:">
                                <el-select v-model="dataParams.fileType" placeholder="请选择">
                                  <el-option label="PDF" value="1"></el-option>
                                  <el-option label="word" value="2"></el-option>
                              </el-select>
                          </el-form-item>
                    </div>
                    <div style="display: flex;">
                        <el-form-item label="文件路径:">
                            <el-input v-model="dataParams.proPath"  style="width: 180px;" placeholder="请输入文件路径"></el-input>
                        </el-form-item>
                        <el-form-item label="发送时间:">
                            <el-date-picker
                            style="width: 180px;"
                                v-model="dataParams.sendTime"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <el-form-item label="领导:">
                          <el-input v-model="dataParams.leader" placeholder="请输入领导名称"></el-input>
                      </el-form-item>
                    <div style="display: flex;">
                      <el-form-item label="值班员:">
                            <el-input v-model="dataParams.officer"  style="width: 180px;" placeholder="请输入值班员名称"></el-input>
                        </el-form-item>
                      <el-form-item label="审核员:">
                          <el-input v-model="dataParams.auditor" placeholder="请输入审核员名称"></el-input>
                      </el-form-item>
                    </div>
                   
                    

                    <!-- <el-form-item label="预警级别:">
                          <el-radio-group  v-model="dataParams.choose">
                              <el-radio :label="1">蓝色（IV）</el-radio>
                              <el-radio :label="2">黄色（III）</el-radio>
                              <el-radio :label="2">橙色（II）</el-radio>
                              <el-radio :label="2">红色（I）</el-radio>
                          </el-radio-group>
                    </el-form-item> -->
                   
                    <el-form-item label="预警照片:">
                      <el-upload
                          action="#"
                          list-type="picture-card"
                          :show-file-list="false"
                          :on-change="handlePictureCardPreview"
                          :on-remove="handleRemove"
                          >
                          <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
                          <i v-else class="el-icon-plus"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="预警描述:">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="dataParams.warnContent">
                        </el-input>
                    </el-form-item>
               
                </el-form>
            </div>
       </div>
  </div>  
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
  export default {
    name: 'productManage',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        loadingStatus: false,
        form:{

        },
        dataParams: {
            "auditor": "",
            "fileName": "",
            "fileType": "",
            "leader": "",
            "number": "",
            "officer": "",
            "proPath": "",
            "sendTime": "",
            "title": "",
            "warnContent": ""
        },
        map: null,
      }
    },
    mounted(){
      this.$nextTick(() => {
          this.initMap()
      })
    },
    methods: {
        initMap() {
          // const VEC_C = 'http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5d969d0124cd5c9e32454b353e50070f';
          // // const CVA_C =
          // //   'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5d969d0124cd5c9e32454b353e50070f';
          // const TK_KEY = '天地图key';
          // var layer1 = L.tileLayer(VEC_C + TK_KEY, {
          //   tileSize: 256,
          //   layers: 'layers1'
          // });
          // // var layer2 = L.tileLayer(CVA_C + TK_KEY, {
          // //   tileSize: 256,
          // //   layers: 'layers2'
          // // });
          // this.map = L.map('map', {
          //     center: [29.12495511624777, 113.57457709047115],
          //     zoom: 5,
          //     crs: L.CRS.EPSG4326,
          //     layers: [layer1],
          //     zoomControl: false, // 禁用 + - 按钮
          //     doubleClickZoom: false, // 禁用双击放大
          //     attributionControl: false // 移除右下角leaflet标识
          // });

          var map = L.map('map', {
            center: [39.928891, 116.388245],
            zoom: 4,
            // crs: L.CRS.EPSG4326,
            zoomControl: false, // 禁用 + - 按钮
            doubleClickZoom: false, // 禁用双击放大
            attributionControl: false // 移除右下角leaflet标识
          });
          L.tileLayer("http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5d969d0124cd5c9e32454b353e50070f", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
            attribution: "天地图",
        }).addTo(map);

      },
      onSubmit(){
        this.loadingStatus = true
          this.$http.post('/product/make', this.dataParams).then(res => {
              this.loadingStatus = false
              if (res.code == 200){
                  // this.handleClose()
                  // this.initData()
                  let link = document.createElement('a');
                  link.href = res.data.proPath;
                  link.download = res.data.fileName;
                  // link.setAttribute(res.data.fileName, res.data.proPath);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  this.$notify.success({  title: '生成成功', });
              } else {
                  this.$notify.error({  title: '生成失败', });
              }
              
          })    
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          let url = URL.createObjectURL(file.raw);
          this.dialogImageUrl = url;

          let data = new FormData();
          // data.append('file', file.raw);
          this.$http.post('/product/upload', data).then(res => {
            if (res.code == 200){
              this.dataParams.imgUrl = res.data;
              // this.dialogImageUrl = res.data;
            } else {
              this.$notify.error({  title: '上传失败', });
            }
          })
      },
      downloadFile(){
          let link = document.createElement('a');
          link.href = this.dialogImageUrl;
          link.download = '1.png';
          // link.setAttribute(res.data.fileName, res.data.proPath);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    }
}
</script>
<style lang="scss" scoped>
.productManage{
  height: 100%;
  display: flex;
  flex-direction: column;
  .head{
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .content{
    flex: 1;
    display: flex;
    #map{
      width: 100%;
      height: 100%;
    }
    .map{
      position: relative;
      flex: 1;
    }
    .map-left{
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 9999;
      background-color: #fff;
      border-radius: 10px;
      font-size: 15px;
      padding: 0 20px;

      >div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        padding: 5px 0;
        cursor: pointer;
        &:not(:last-child){
          border-bottom: 1px solid #ccc;
        }
      }
      i{
        font-size: 22px;
        margin-bottom: 5px;
        color: #409EFF;
      }
    }
    .right-content{
      width: 600px;
      padding: 20px;
      background-color: #fff;
    }
  }


  .el-form--inline .el-form-item{
    margin: 0;
    margin-left: 10px;
  }
  /deep/ .el-upload{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar{
    width: 100px;
    height: 100px;
  }
}

</style>