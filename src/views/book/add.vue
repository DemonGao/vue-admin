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
            <el-form-item label="图书名称"
                          prop="name"
                          :rules="[
                { required: true, message: '图书名称不能为空'}
              ]"
            >
              <el-input v-model="book.name"></el-input>
            </el-form-item>
            <el-form-item label="作者"
                          prop="author"
                          :rules="[
                { required: true, message: '作者不能为空'}
              ]"
            >
              <el-input v-model="book.author"></el-input>
            </el-form-item>
            <el-form-item label="图书简介"
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
            <el-form-item label="图书类目"
                          prop="typeId"
                          :rules="[
                { required: true, message: '图书类目不能为空'}
              ]"
            >
              <el-select
                style="width: 100%;"
                v-model="book.typeId"
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
            <el-form-item label="图书标签"
                          prop="tags"
                          :rules="[
                { required: true, message: '图书标签不能为空'}
              ]"
            >
              <el-select
                style="width: 100%;"
                v-model="book.tags"
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
            <el-form-item label="排序"
                          prop="order"
                          :rules="[
                  { required: true, message: '排序不能为空'},
                  { type: 'number', message: '排序必须为数字值'}
                ]"
            >
              <el-input v-model.number="book.order" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="精选">
              <el-radio-group v-model.number="book.isfree" size="medium">
                <el-radio border :label="1">是</el-radio>
                <el-radio border :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="8">
          <!--图书封面上传-->
          <el-card>
            <div slot="header" class="clearfix">
              <span>图书封面上传</span>
            </div>
            <el-upload
              class="dragImg"
              ref="uploadImg"
              name="file"
              action="https://upload.qiniup.com"
              :data="imgData"
              drag
              show-file-list
              :limit="1"
              accept="image/png"
              list-type="picture"
              :auto-upload="false"
              :before-upload="beforeUploadImg"
              :on-exceed="uploadExceed"
              :on-change="uploadImgChange"
              :on-remove="uploadImgRemove"
              :on-success="uploadImgSuccess"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传png文件，且不超过500kb</div>
            </el-upload>
          </el-card>
          <!--图书文档上传-->
          <el-card style="margin-top: 10px;">
            <div slot="header" class="clearfix">
              <span>图书文档上传</span>
            </div>
            <el-upload
              ref="uploadTxt"
              class="dragImg"
              action="https://upload.qiniup.com"
              :data="txtData"
              drag
              show-file-list
              :limit="1"
              list-type="picture"
              :auto-upload="false"
              :before-upload="beforeUploadTxt"
              :on-exceed="uploadExceed"
              :on-change="uploadTxtChange"
              :on-remove="uploadTxtRemove"
              :on-success="uploadTxtSuccess"
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
  import {add as addBook} from '@/api/book'
  import {getToken} from '@/api/qiniu'
  import {fetchList as fetTagList} from '@/api/bookTag'
  import {fetchList as fetTypeList} from '@/api/bookType'
  import UploadMixins from '@/mixins/UploadMixins'
  import FormMixins from '@/mixins/FormMixins'

  const fileSize = (size) => {
    if (size < 1024) {
      if (size > 100) {
        return (parseInt(size) / 1024).toFixed(2) + 'KB'
      }
      return size + 'byte'
    }
    if ((size / 1024) < 1024) {
      if ((size / 1024) > 100) {
        return (parseInt(size) / 1024 / 1024).toFixed(2) + 'MB'
      }
      return (parseInt(size) / 1024).toFixed(2) + 'KB'
    } else {
      return (parseInt(size) / 1024 / 1024).toFixed(2) + 'MB'
    }
  }
  export default {
    mixins: [UploadMixins, FormMixins],
    data() {
      return {
        imgData: {token: '', key: ''},
        txtData: {token: '', key: ''},
        book: {
          id: null,
          name: '',
          content: '',
          typeId: '',
          author: '',
          tags: [],
          order: 0,
          isfree: 0,
          fileType: null,
          size: null
        },
        tagList: [],
        typeList: [],
        isUploadImgFiles: false,
        isUploadTxtFiles: false,
        imgSuccess: false,
        txtSuccess: false
      }
    },
    components: {},
    computed: {},
    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.isUploadImgFiles) {
              this.$message({
                message: '请上传图书封面',
                type: 'warning'
              })
              return false
            }
            if (!this.isUploadTxtFiles) {
              this.$message({
                message: '请上传图书文档',
                type: 'warning'
              })
              return false
            }
            const createTags = []
            const tagIds = []
            const {tags, typeId} = this.book
            const data = this.book
            if (Object.prototype.toString.call(typeId) === '[object String]') {
              Object.assign(data, {
                createType: {
                  name: typeId
                },
                typeId: null
              })
            }
            tags.forEach((item) => {
              if (Object.prototype.toString.call(item) === '[object String]') {
                createTags.push({
                  id: null,
                  name: item
                })
              } else {
                tagIds.push(parseInt(item))
              }
            })
            Object.assign(data, {
              name: this.book.name.replace(/(^\s*)|(\s*$)/g, ''),
              author: this.book.author.replace(/(^\s*)|(\s*$)/g, ''),
              content: this.book.content.replace(/(^\s*)|(\s*$)/g, ''),
              tagIds,
              createTags
            })
            addBook(data).then(res => {
              console.log(res)
              this.book.id = res.id
              this.$refs.uploadTxt.submit()
              this.$refs.uploadImg.submit()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 图片上传操作
      uploadImgChange(file, fileList) {
        this.isUploadImgFiles = true
      },
      uploadImgRemove(file, fileList) {
        this.isUploadImgFiles = false
      },
      beforeUploadImg() {
        return getToken().then(res => {
          this.imgData.key = `image/book-img_${this.book.id}.png`
          this.imgData.token = res
        })
      },
      uploadImgSuccess() {
        this.imgSuccess = true
        if (this.txtSuccess) {
          this.$confirm(`图书上传成功  小程序路径: pages/book/bookdesc?book_id=${this.book.id}&shareUserId=7&title=5.22新书推荐：${this.book.name}, 是否继续上传?`, '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '返回列表',
            type: 'warning'
          }).catch(() => {
            this.$route.push({name: 'bookList'})
          })
        }
      },
      // 图书上传操作
      uploadTxtChange(file, fileList) {
        this.isUploadTxtFiles = true
        const names = file.name.split('.')
        this.book.fileType = names[names.length - 1]
        this.book.size = fileSize(file.size)
      },
      uploadTxtRemove(file, fileList) {
        this.isUploadTxtFiles = false
        this.book.fileType = null
        this.book.size = null
      },
      beforeUploadTxt() {
        return getToken().then(res => {
          this.txtData.key = `image/book-txt_${this.book.id}.${this.book.fileType}`
          this.txtData.token = res
        })
      },
      uploadTxtSuccess() {
        this.txtSuccess = true
        if (this.imgSuccess) {
          this.$confirm(`图书上传成功  小程序路径: pages/book/bookdesc?book_id=${this.book.id}&shareUserId=7&title=5.22新书推荐：${this.book.name}, 是否继续上传?`, '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '返回列表',
            type: 'warning'
          }).then((res) => {
            this.resetForm('bookForm')
            this.$refs.uploadImg.clearFiles()
            this.$refs.uploadTxt.clearFiles()
          }).catch(() => {
            this.$router.push({name: 'bookList'})
          })
        }
      }
    },
    created() {
      Promise.all([fetTagList(), fetTypeList()])
        .then(([tagListRes, typeListRes]) => {
          this.tagList = tagListRes
          this.typeList = typeListRes
        })
    },
    mounted() {
    }
  }
</script>
