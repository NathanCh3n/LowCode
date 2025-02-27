/**
 *  @description 段落组件
 */
import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'
// paragraph 组件配置
export default {
  title: '段落',
  type: 'questionPragraph',
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
