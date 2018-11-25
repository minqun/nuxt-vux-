/** 描述
 *  接口函数命名规范：
 * - 每个接口函数首字母为大写
 * - 有 '_ -' 等下划线、斜杠等连接的单词改以驼峰形态命名 如 ac_bc -> AcBc
 * - 查询：      以 'Query' 开头
 * - 新增、修改： 以 'Edit' 开头
 * - 启用停用：   以 'Status' 开头
 * - 导出：       以 'Export' 开头
 * - 删除：       以 'Delete' 开头
 * - 其他接口：    以 '接口路径最后的单词' 作为开头 比如 'ticket-ref/ticket/get_by_code' 可命名为 GetByCodeTicket
 * - 命名单词不宜太长、一般最好不要超过5个单词，如 GetByCodeTicket 包含了4个单词，分别有 get\by\code\ticket
 * - 一般是以 动词 + 名称 的规则来命名。
 */
import { fetchApi } from './fetch'
const API = 'book'
// *-------------------------------------------小说阅读接口-------------------------------------------------------------*/
// 获取书籍信息接口
function GetBookInfo (params) {
  return fetchApi(API, 'info', params)
}
// 获取书籍目录接口 --章节目录详情
function GetBookDir (params) {
  return fetchApi(API, 'dir', params)
}
// 获取书籍章节内容接口
function GetBookDetail (params) {
  return fetchApi(API, 'chapter', params)
}
// 小说分类书籍列表页接口
function GetTypeBookList (params) {
  return fetchApi('category', 'booklist', params)
}
// 小说分类页接口
function GetTypeList (params) {
  return fetchApi('category', 'list', params)
}
// 小说热门书籍列表接口
function GetHotList (params) {
  return fetchApi(API, 'hotBooks', params)
}
// 小说站首页数据获取
function GetMain (params) {
  return fetchApi(API, 'city', params)
}
// *-------------------------------------------小说阅读接口-------------------------------------------------------------*/

export default {
  // 获取书籍信息
  GetBookInfo,
  GetBookDetail,
  GetBookDir,
  GetTypeBookList,
  GetHotList,
  GetMain,
  GetTypeList
}
