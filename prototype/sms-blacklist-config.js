window.SMS_BLACKLIST_CONFIG = Object.freeze({
  sourceSystems: ["法诉系统", "租后系统", "营销平台", "客服系统", "商户系统", "大平台系统", "租赁系统", "分期系统"],
  collectionSources: ["租后系统", "法诉系统"],
  blacklistTypes: ["营销类", "通知类", "催收类"],
  labels: ["非本人手机号", "客户投诉", "手机号停机或空号", "协商还款", "其它"],
  templateHeaders: ["客户姓名", "手机号", "黑名单类型", "标签", "来源系统", "加入原因", "有效期截止日"],
  maxRows: 5000,
  maxFileSizeBytes: 10 * 1024 * 1024,
});
