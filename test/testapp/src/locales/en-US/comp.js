/**
 * 独立组件
 */

import X from './compX';

export default {
  ...X,
  // 表格头部的 快捷键提示语
  'comp.table.keymap-1': 'Use ',
  'comp.table.keymap-2': 'shortcuts',
  'comp.table.keymap-3': ' wisely, can effectively improve your efficiency',
  'comp.table.keymap':'Shortcuts',

  // 快捷键表格组件
  'comp.keymap.col.name':'Function',
  'comp.keymap.col.keymap':'Shortcuts',
  'comp.keymap.balancing':'Auto-balance the borrower\'s amounts',
  'comp.keymap.prev-cell':'Previous cell',
  'comp.keymap.next-cell':'Next cell',
  'comp.keymap.prev-row':'Previous row cell',
  'comp.keymap.next-row':'Next row cell',
  'comp.keymap.add-row':'Add a row',
  'comp.keymap.inset-row':'Inset a row',
  'comp.keymap.del-row':'Delete a row',
  'comp.keymap.mv-up-row':'Move up row',
  'comp.keymap.mv-down-row':'Move down row',

  // SearchComp
  'comp.searchComp.filters':'Filters',

  // 导入导出
  'comp.import.download': 'Download Excel',
  'comp.import.download.btn': 'Download Excel',
  'comp.import.download.tip': 'Please click on the button below to download the template, and fill in information according to the Excel',
  'comp.import.upload': 'Import Excel',
  'comp.import.upload.btn': 'Upload Excel',
  'comp.import.continue.btn': 'Continue',
  'comp.import.upload.tip': 'Import completed Excel file',

  // 打印组件
  'comp.print.title':'Print Settings',
  'comp.print.option':'Print options',
  'comp.print.option.all':'Print All',
  'comp.print.option.selected':'Print Selected',
  'comp.print.paper':'Select paper',
  'comp.print.paper.fp':'Invoice 140mm*240mm',
  'comp.print.paper.a4-2':'A4 Two Editions',
  'comp.print.paper.a4-3':'A4 Three Editions',
  'comp.print.rcmd':'Recommended',

  // 文件上传组件（弹框）
  'comp.uploadModal.title':'Attachment uploads',
  'comp.uploadModal.upNewFile':'Upload new files',
  'comp.uploadModal.selFromFiles':'Select from file center',
  'comp.uploadModal.path':'File path',
  'comp.uploadModal.selDir':'Please select a directory',
  'comp.uploadModal.upTip':'Please upload the file',
  'comp.uploadModal.upTip1':'Please drag the upload file into this area to complete the upload',
  'comp.uploadModal.upTip2':'Support for single or bulk uploads',
  'comp.uploadModal.upDone':'Upload complete',
  'comp.uploadModal.uploaded':'Uploaded',
  'comp.uploadModal.upFail':'Upload failed',
  'comp.uploadModal.confirmUp':'Confirm upload',
  'comp.uploadModal.confirmSel':'Confirm Select',
};
