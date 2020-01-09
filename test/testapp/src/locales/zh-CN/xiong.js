export default {
  'actionx.unPost': '反过账',
  'infox.zcfzChk': '资产负债校验表',
  'infox.saveDesc': '保存备注',
  'infox.rjztydt': '日记账-通用-单体',
  'infox.zlty': '直连通用',
  'infox.fzlty': '非直连-通用',
  'infox.fzlgqbd': '非直连-股权变动',
  'infox.rjztydt01': '001 日记账-通用-单体',
  'infox.fzlty02': '002 非直连-通用',
  'infox.fzlgqbd03': '003 非直连-股权变动',
  'infox.jn.kmInfo2': '。比如：添加行（Shift+Alt+↓）、删除行（Shift+Delete）',
  'fieldx.errDesc': '错误描述',
  'infox.rjzfzl': '日记账/非直连导入模板',

  // 公共部分
  'infox.lockState1': '校验结果已提交',
  // 菜单
  'menu.itRec': 'IT长投与对价对账调整表',
  'menu.historyEx': '历史汇率补录表',
  'menu.remarkChk': '备注校验表',
  'menu.ttOuput': 'TT底稿导出',
  // 系统监控
  'menu.sysI': '系统监控',
  'menu.sysI.uCnt': '实时在线用户数',
  'menu.sysI.cCnt': '实时在线连接数',
  // 表头信息
  'fieldx.ti.exField': '关联属性',
  'fieldx.ti.isBdwm': '是否当期股权变动项目',
  'fieldx.ti.dataSys': '数据来源系统',
  'fieldx.ti.toDate': '股权变动期间',
  'fieldx.ti.toAttr': '收购属性',
  'fieldx.ti.bpcAttr': 'BPC变动属性',
  // 分录
  'fieldx.st.jdftt': '借贷方调整额合计',
  // 递延
  'fieldx.df.sy': '适用',
  'fieldx.df.bsy': '不适用',
  'fieldx.df.comment': `如果报表数据有更新，必须重新点击“保存”
  1、本表应检查:当年递延税款借项余额=递延税款借项合并调整数=TT005 TT主表的递延税款借项调整后余额;
  2、上述检查不一致的请检查是否账面已计提递延税款借项，已计提的请先再TT003冲回账面已计提的。
  
  适用说明：指需要出具改表，正常填报数据/保存数据即可
  不适用说明：指因为各种特殊原因，不需要出具该表但需要进行以下操作：
  1、为了满足同意校验，需在“时间差异性”分类下“所得税率”本年/上年位置均填写统一的占位数字1;
  2、选择不适用后，“合并调整”所有行自动置零。同时，必须点击EPM-保存数据`,
  // 银行借款
  'fieldx.bankL.comment': `填报说明：以下贷款明细中“合同编号”是从核算系统抽取得到，因部分字符无法在BPC报表系统被识别，故将无法识别字符统一修改成“_”（下划线）后进行抽取。请悉知。`,
  // 长投
  'fieldx.rett.f1': '被投资方账套名称',
  'fieldx.rett.f2': '被投资方账套编码',
  'fieldx.rett.f3': '被投资方上市属性',
  'fieldx.rett.f4': '长期股权投资余额（单体调整后）',
  'fieldx.rett.f5': '交易对价',
  'fieldx.rett.f6': '对价差异',
  'fieldx.rett.f7': '交易方MDG编码',
  'fieldx.rett.f8': '交易方名称',
  'fieldx.rett.f9': '代付方MDG编码',
  'fieldx.rett.f10': '代付方名称',
  'fieldx.rett.f11': '其他应收调整前-交易方',
  'fieldx.rett.f12': '其他应收调整前-被投资方',
  'fieldx.rett.f13': '其他应收调整前-代付方',
  'fieldx.rett.f14': '其他应付调整前-交易方',
  'fieldx.rett.f15': '其他应付调整前-被投资方',
  'fieldx.rett.f16': '其他应付调整前-代付方',
  'fieldx.rett.f17': '未付对价',
  'fieldx.rett.comment': `填表说明：当投资公司（上市属性）对外投资时，被投资公司（上市属性）的收购属性为资产收购、企业合并及联营合营转子公司时需填本表，蓝色区域为必填项。	
填表逻辑：当交易对价-长期股权投资余额（单体调整后）-往来科目金额（即其他应收/付款）-未付对价=0，若不相等需填写备注	
操作步骤：	
1、自动取出单体手工填报的交易方MDG编码，代付方MDG编码和往来数据。上市组如需调整，需要填报交易方MDG编码，代付方MDG编码后点击保存	
2、表单自动根据报表数据计算调整分录数据，点击保存，调整分录保存到系统，影响调整后长期股权投资，通过输出表查询调整结果`,

  // 地图使用权
  'fieldx.landNc.comment': `1、NC公司全手工填报，SAP公司部分手工填报。蓝色区域为可输入区域。
2、本年摊销计入管理费用的金额应与RP087管理费用的土地使用权摊销数一致。
3、实际土地使用权金额：NC用户需要将《RP无形资产》中的土地使用权通过输入表调整转至《RP土地使用权》，调整至“单体调整”列。具体填写要求详见 《土地使用权填写指南》`,
  'fieldx.landSap.comment': `1、NC公司全手工填报，SAP公司部分手工填报。蓝色区域为可输入区域。
2、本年摊销计入管理费用的金额应与RP087管理费用的土地使用权摊销数一致。`,
  // 运行包
  'yxb.data1':'1001个别报表期初结转',
  'yxb.data2':'1002个别报表重分类',
  'yxb.data3':'1003本年利润计算',
  'yxb.data12':'1012单体土地使用权重分类',
  'yxb.data14':'1014购买日数据处理',
  'yxb.data18':'1018清除权益',
  'yxb.data30':'1030RP150期初数据处理',
  'yxb.data8':'1008单体货币折算',
  'yxb.data11':'1011单体调整后执行数据包',
  'yxb.data13':'1013计算往来单位属性',
  'yxb.data16':'1016股权变动公司报表',
  'yxb.data4':'1004历史汇率数据复制',
  // 提示语
  'tipx.noUpdate': '暂无更新！',
  'tipx.isSaveDesc': '是否保存备注？',
  'tipx.st.jdbph': '借贷不平衡',
  'tipx.st.tip1': '数据有误，请手动清除 BP 数据',
  'tipx.severFail': '服务器繁忙，请稍后再试',
  'tip.noData': '暂无数据',
  'tip.yxb.tip1': '【{name}】，非本年股权变动公司无需填报',
  'tip.rett.jyfdff': '第【{line}】行，【{jyf}】不能等于【{dff}】',
  'tip.wfbc': '无法保存，请求修改',
  'tip.adjust.dzswl': '第【{line}】行：调整数不为0',
  'tip.adjust.nonewl': '第【{line}】行：【NONE】列【调整后】不为0',
  'tip.adjust.errTip': '请在调整前运行1013运行包',
  'action.qzx': '去执行',

  'field.pjhl':'平均汇率',
};
