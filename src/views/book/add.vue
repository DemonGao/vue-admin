<style lang="less" rel="stylesheet/less" scoped>
  .add {
    height: 100%;
    padding: 15px;
    .dragImg /deep/ .el-upload, .dragImg /deep/ .el-upload-dragger {
      width: 100%;
    }
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px 20px;
      box-shadow: 0 -5px 20px -10px #ccc;
      background-color: #FFFFFF;
    }
  }
</style>
<template>
  <div class="add">
    <el-form ref="bookForm" :model="book" label-width="80px" status-icon>
      <el-row :gutter="12">
        <el-col :span="16">
          <el-card>
            <el-form-item
              label="图书名称"
              prop="name"
              :rules="[
                { required: true, message: '图书名称不能为空'}
              ]"
            >
              <el-input v-model="book.name"></el-input>
            </el-form-item>
            <el-form-item
              label="图书简介"
              prop="content"
              :rules="[
                { required: true, message: '图书简介不能为空'}
              ]"
            >
              <el-input
                type="textarea"
                v-model="book.content"
                resize="none"
                rows="5"
                clearable
                maxlength="1000"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="图书类目"
              prop="type"
              :rules="[
                { required: true, message: '图书类目不能为空'}
              ]"
            >
              <el-select
                style="width: 100%;"
                v-model="book.type"
                filterable
                allow-create
                default-first-option
                placeholder="请选择图书类目">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图书标签">
              <el-select
                style="width: 100%;"
                v-model="book.tag"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择图书标签">
                <el-option
                  v-for="item in tagList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>图书封面上传</span>
            </div>
            <el-upload
              class="dragImg"
              name="file"
              :file-list="book.img"
              action="https://jsonplaceholder.typicode.com/posts/"
              drag
              show-file-list
              :limit="1"
              accept="image/png"
              list-type="picture"
              :auto-upload="false"
              :on-exceed="uploadExceed"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传png文件，且不超过500kb</div>
            </el-upload>
          </el-card>
          <el-card style="margin-top: 10px;">
            <div slot="header" class="clearfix">
              <span>图书文档上传</span>
            </div>
            <el-upload
              ref="upload"
              class="dragImg"
              name="file"
              :data="dataObj"
              :file-list="book.img"
              action="https://upload.qiniup.com"
              drag
              show-file-list
              :limit="1"
              accept="mobi"
              list-type="picture"
              :auto-upload="false"
              :on-exceed="uploadExceed"
              :on-change="uploadChange"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传png文件，且不超过500kb</div>
            </el-upload>
          </el-card>
        </el-col>
      </el-row>

      <el-row class="footer" type="flex" justify="end" align="middle">
        <el-button
          type="primary"
          round
          @click="submitForm('bookForm')"
        >提交
        </el-button>
        <el-button
          round
          @click="resetForm('bookForm')"
        >重置
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { add as addBook } from '@/api/book'
  import { getToken } from '@/api/qiniu'
  import { fetchList as fetTagList } from '@/api/bookTag'
  import { fetchList as fetTypeList } from '@/api/bookType'
  import UploadMixins from '@/mixins/UploadMixins'
  import FormMixins from '@/mixins/FormMixins'

  export default {
    mixins: [UploadMixins, FormMixins],
    data () {
      return {
        dataObj: {token: '', key: ''},
        book: {
          name: '',
          content: '',
          type: '',
          tag: [],
          img: []
        },
        tagList: [],
        typeList: []
      }
    },
    components: {},
    computed: {},
    methods: {
      async submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addBook().then(res => {
              this.$refs.upload.submit()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      async beforeUpload () {
        const token = await getToken()
        this.dataObj.token = 'book.mobi'
        this.dataObj.key = token
        console.log(this.dataObj)
        return true
      }
    },
    created () {
      getToken()
      Promise.all([fetTagList(), fetTypeList()])
        .then(([tagListRes, typeListRes]) => {
          this.tagList = tagListRes.list
          this.typeList = typeListRes.list
        })
    },
    mounted () {}
  }
</script>
