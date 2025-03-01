/**
 * @description: 问题信息组件
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'
export * from './interface'
// paragraph 组件配置
export default {
  title: '问题信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
