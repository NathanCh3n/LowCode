export type OptionType = {
  value: string
  text: string
  checked: boolean
}
export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]
  disabled?: boolean
  onChange?: (newProps: QuestionCheckboxPropsType) => void
}
export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选',
  isVertical: false,
  list: [
    { value: '选项1', text: '选项1', checked: false },
    { value: '选项2', text: '选项2', checked: false },
    { value: '选项3', text: '选项3', checked: false },
  ],
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
