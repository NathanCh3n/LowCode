/**
 * @description 单选组件配置
 */

import Component from './Component'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'
import StatComponent from './StatCompnent'
export * from './interface'
// radio 组件配置
export default {
  title: '单选',
  type: 'questionRadio',
  Component: Component,
  PropComponent: PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
}
