/**
 * 校验提示语
 */
import X from './tipX';

export default {
  ...X,

  200: '操作成功',
  201: '操作失败',
  202: '处理中，请稍后',
  204: '操作成功，请手动刷新-204',
  400: '访问失败，请联系管理员-400',
  401: '没有权限',
  403: '访问受限',
  404: '页面不存在',
  405: '访问受限，请联系管理-405',
  406: '访问受限，请联系管理员-406',
  409: '访问受限，请联系管理员-409',
  410: '请求的资源被永久删除',
  415: '请求的资源类型不支持',
  422: '访问受限，请联系管理员-422',
  429: '操作过于频繁',
  500: '访问受限，请联系管理员-500',
  510: '访问受限，请联系管理员-510',
  502: '访问受限，请联系管理员-502',
  503: '系统维护中...',
  504: '网络信号较差，访问超时',

  'crud.tip.save': '确认保存信息吗？',
  'crud.tip.check': '确认校验信息吗？',
  'crud.tip.sync': '确认同步信息吗？',
  'crud.tip.delete': '确认删除吗？',
  'crud.tip.refresh': '确认重置密码吗？',
  'crud.tip.delete.selected': '确认删除选中的记录吗？',
  'crud.tip.remove.selected': '确认移除所选项吗？',
  'crud.tip.confirm-action': '确认对选中的记录进行 [{name}] 操作吗？',
  'crud.tip.confirm-tip': '确认进行 [{name}] 操作吗？',
  'crud.tip.confirm': '确认操作吗？',
  'crud.tip.confirm_': '确认操作吗?',
  'global.logout.confirm': '确认退出吗？',

  'global.login.timeout': '登录已过期',
  'global.login.timeout.tip': '由于您长时间未操作或相同账号在另外地点登录，请重新登录。',
  'global.reload.title': '确认刷新网站吗？',
  'global.reload.tip': '刷新网站后，当前页面的缓存数据将被清空',

  'tip.login-first': '请先登录',
  'tip.execing': '执行中...',
  'global.request.loading': '请求中...',
  'global.request.fail': '操作失败',
  'crud.tip.no-found': '数据不存在',
  'crud.tip.success': '操作成功',
  'crud.tip.save.suc': '保存成功',
  'crud.tip.check.suc': '校验成功',
  'crud.tip.delete.num': '成功删除记录数',
  'crud.tip.no-select': '请先选择需要操作的记录',
  'crud.tip.nothing': '没有什么更新的',
  'crud.tip.no-record': '无可操作的记录',
  'crud.tip.list-field-empty': '第【{line}】行，{name} 不能为空',

  'comp.form.field.required': '{name}不能为空',
  'comp.form.select.required': '请选择{name}',
  'comp.form.input.required': '请输入{name}',
  'comp.form.choose-first': '请先选择【{name}】',

  'comp.select.placeholder': '请选择',
  'comp.search.placeholder': '输入搜索',

  'tip.phone.captcha': '验证码已发送，请留意手机短信',
  'tip.phone.noRegister': '手机号未注册',
  'tip.login.suc': '登录成功',
  'tip.login.fail': '登录失败',
  'tip.login.err': '账号或密码错误',
  'tip.wxLogin.noUser': '获取微信用户信息失败，请重新扫码',
  'tip.wxLogin.noBind': '微信未绑定账号',
  'tip.wxLogin.noConf': '获取微信配置失败',
  'tip.register.fail': '注册失败',
  'tip.act.fail': '操作失败，请稍后重试',

  'tip.file.uploadFail': '{name}文件上传失败',
  'tip.importFail': '导入失败',
  'tip.chsExcel': '请选择 Excel 文件',
  'tip.window.open': '本站弹出窗口被屏蔽，如需查看请修改浏览器相关配置！',

  'tip.noData': '无匹配数据',

};
