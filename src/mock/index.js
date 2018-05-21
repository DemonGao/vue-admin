import Mock from 'mockjs'
import loginAPI from './login'
import book from './book'
import bookTag from './bookTag'
import bookType from './bookType'

// import remoteSearchAPI from './remoteSearch'
// import articleAPI from './article'
// import transactionAPI from './transaction'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/cms\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/cms\/user\/userInfo/, 'post', loginAPI.getUserInfo)

// 图书相关
Mock.mock(/\/kindle\/cms\/bookTag\/loadList/, 'post', bookTag.getList)
Mock.mock(/\/kindle\/cms\/bookType\/loadList/, 'post', bookType.getList)
Mock.mock(/\/kindle\/cms\/book\/add/, 'post', book.add)

// 1

// 文章相关
// Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
// Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
// Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
// Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
// Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// // 搜索相关
// Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
// Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
