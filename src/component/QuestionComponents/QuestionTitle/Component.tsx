import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography
const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const {
    text = '',
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props }
  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    if (level === 4) return '14px'
    if (level === 5) return '12px'
    return '24px'
  }
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: '0px',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
