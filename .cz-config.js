'use strict';

module.exports = {

  types: [
    {value: 'feat',name: '新特性'},
    {value: 'fix',name: '修改问题'},
    {value: 'docs',name: '文档变更'},
    {value: 'test',name: '测试用例变更'},
    {value: 'chore',name: '其他修改, 比如构建流程, 依赖管理'},
    {value: 'refactor',name: '代码重构'},
  ],

  scopes: [],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    // scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    // customScope: 'Denote the SCOPE of this change:',
    subject: '改动/新增了什么模块:\n',
    body: '具体改了啥，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },
  skipQuestions: ['scope', 'footer', 'breaking'],
  allowCustomScopes: false,
  allowBreakingChanges: ['特性', '修复'],

  // limit subject length
  subjectLimit: 100

};
