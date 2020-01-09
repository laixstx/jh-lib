/**
 * 独立组件
 */

import X from './compX';

export default {
  ...X,
  // 表格头部的 快捷键提示语
  'comp.table.keymap-1':'合理使用',
  'comp.table.keymap-2':'快捷键',
  'comp.table.keymap-3':'，可以有效提高录入效率',
  'comp.table.keymap':'查看快捷键',

  // 快捷键表格组件
  'comp.keymap.col.name':'功能',
  'comp.keymap.col.keymap':'快捷键',
  'comp.keymap.balancing':'自动平衡借贷方金额',
  'comp.keymap.prev-cell':'上一单元格',
  'comp.keymap.next-cell':'下一单元格',
  'comp.keymap.prev-row':'上一行单元格',
  'comp.keymap.next-row':'下一行单元格',
  'comp.keymap.add-row':'添加行',
  'comp.keymap.inset-row':'插入行',
  'comp.keymap.del-row':'删除行',
  'comp.keymap.mv-up-row':'上移行',
  'comp.keymap.mv-down-row':'下移行',

  // SearchComp
  'comp.searchComp.filters':'筛选条件',

  // 导入导出
  'comp.import.download':'下载模板',
  'comp.import.download.btn':'下载{name}模板',
  'comp.import.download.tip':'请点击下面的按钮下载模板，并填写{name}信息',
  'comp.import.upload': '导入{name}',
  'comp.import.upload.btn': '上传{name}模板',
  'comp.import.continue.btn': '继续导入',
  'comp.import.upload.tip': '导入已完成的{name} Excel 文件',

  // 打印组件
  'comp.print.title':'打印设置',
  'comp.print.option':'打印选项',
  'comp.print.option.all':'打印全部',
  'comp.print.option.selected':'打印选中',
  'comp.print.paper':'选择纸张',
  'comp.print.paper.fp':'发票版 140毫米*240毫米',
  'comp.print.paper.a4-2':'A4两版',
  'comp.print.paper.a4-3':'A4三版',
  'comp.print.rcmd':'推荐',

  // 文件上传组件（弹框）
  'comp.uploadModal.title':'附件上传',
  'comp.uploadModal.upNewFile':'上传新文件',
  'comp.uploadModal.selFromFiles':'从文件中心选择',
  'comp.uploadModal.path':'文件路径',
  'comp.uploadModal.selDir':'请选择目录',
  'comp.uploadModal.upTip':'请上传文件',
  'comp.uploadModal.upTip1':'请将上传文件拖入此区域完成上传',
  'comp.uploadModal.upTip2':'支持单个或批量上传',
  'comp.uploadModal.upDone':'上传完成',
  'comp.uploadModal.uploaded':'已上传',
  'comp.uploadModal.upFail':'上传失败',
  'comp.uploadModal.confirmUp':'确认上传',
  'comp.uploadModal.confirmSel':'确认选择',
};
