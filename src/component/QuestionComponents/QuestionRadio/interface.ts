export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string // 单选的value
  disabled?: boolean
  onChange?: (newProps: QuestionRadioPropsType) => void
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选题',
  isVertical: false,
  options: [
    { value: 'option1', text: '选项1' },
    { value: 'option2', text: '选项2' },
    { value: 'option3', text: '选项3' },
  ],
  value: 'option1',
}
