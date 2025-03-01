/**
 * @description 多行输入框组件
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './interface'
export * from './interface'
export default {
  title: '多行输入框',
  type: 'questionTextarea',
  Component, // 画布显示的组件
  PropComponent, // 编辑器组件
  defaultProps: QuestionTextareaDefaultProps,
}
