import React from 'react'
import { Radio, Typography } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const { Paragraph } = Typography
const QuestionRadio: React.FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const { title, isVertical, options, value } = {
    ...QuestionRadioDefaultProps,
    ...props,
  }

  const radioStyle: React.CSSProperties = isVertical
    ? { display: 'flex', flexDirection: 'column' }
    : {}

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group
        value={value}
        style={radioStyle}
        options={options?.map(option => ({
          value: option.value,
          label: option.text,
        }))}
      />
    </div>
  )
}
export default QuestionRadio
