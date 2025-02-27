import React, { FC } from 'react'
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = '', isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  }
  // 尽量不要使用 dangerouslySetInnerHTML 来渲染 html，会有 xss 攻击风险
  // const t = text.replace('\n', '<br/>')
  const textList = text.split('\n')
  return (
    <Paragraph
      style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}
    >
      {/* <span dangerouslySetInnerHTML={{ __html: t }}></span> */}
      {textList.map((item, index) => (
        <span key={index}>
          {index === 0 ? '' : <br />}
          {item}
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
