<template>
  <el-upload
    action="https://upload.qiniup.com"
    :data="dataObj"
    drag
    :multiple="true"
    :before-upload="beforeUpload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>


<script>
  // import { getToken } from '@/api/qiniu'
  // 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
  // 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk

  export default {
    data () {
      return {
        dataObj: {token: '', key: ''},
        image_uri: [],
        fileList: []
      }
    },
    methods: {
      beforeUpload () {
        const _self = this
        _self._data.dataObj.token = '/test/booksa'
        _self._data.dataObj.key = '3_Ey1cmMGniPjuOLr0IMw7TvNjEcF9XYL1mgld7K:e7AJEz8Pz42oZ8waGVQ4GXwdolI=:eyJzY29wZSI6ImtpbmRsZTovdGVzdC9ib29rIiwiZGVhZGxpbmUiOjE1MjY3MjYzMDh9'
        return true
      }
    }
  }
</script>
