import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionTitleProps, QuestionInputDefaultProps } from './interface'

const { Paragraph } = Typography
const QuestionTitle: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
  const { title = '', placeholder = '' } = {
    ...QuestionInputDefaultProps,
    ...props,
  }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}
export default QuestionTitle
