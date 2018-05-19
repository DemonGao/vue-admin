const mixin = {
  methods: {
    // 重制表单
    resetForm(formName){
      this.$refs[formName].resetFields()
    }
  },
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}
export default mixin
