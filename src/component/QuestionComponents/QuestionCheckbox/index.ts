/**
 * @description 多选组件配置
 */
import Component from './Component'
import { QuestionCheckboxDefaultProps } from './interface'
import PropComponent from './PropComponent'
import StatComponent from './StatCompnent'
export * from './interface'
// checkbox 组件配置
export default {
  title: '多选',
  type: 'questionCheckbox',
  Component: Component,
  PropComponent: PropComponent,
  StatComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
