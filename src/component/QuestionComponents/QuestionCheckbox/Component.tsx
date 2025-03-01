import React, { FC } from 'react'
import {
  QuestionCheckboxPropsType,
  QuestionCheckboxDefaultProps,
} from './interface'
import { Checkbox, Typography } from 'antd'

const { Paragraph } = Typography
const Component: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const { title, isVertical, list } = {
    ...QuestionCheckboxDefaultProps,
    ...props,
  }
  const checkedList = list?.filter(item => item.checked).map(item => item.value)
  const radioStyle: React.CSSProperties = isVertical
    ? { display: 'flex', flexDirection: 'column' }
    : {}
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Checkbox.Group
        value={checkedList}
        options={list?.map(({ text, value, checked }) => ({
          label: text,
          value: value,
          checked: checked,
        }))}
        style={radioStyle}
      />
    </div>
  )
}

export default Component
