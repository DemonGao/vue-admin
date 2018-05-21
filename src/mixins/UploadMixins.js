const mixin = {
  methods: {
    // 上传文件超出限制钩子
    uploadExceed (files, fileList) {
      console.log(files)
      console.log(fileList)
      this.$confirm('已超出最大上传数量, 是否覆盖第一个文件?', '提示', {
        confirmButtonText: '覆盖',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fileList.shift()
        fileList.push(files)
        console.log(fileList)
        this.$message({
          type: 'success',
          message: '替换成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消替换!'
        })
      })
    }
  },
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}
export default mixin
