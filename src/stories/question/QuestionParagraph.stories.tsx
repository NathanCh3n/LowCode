import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Component from '../../component/QuestionComponents/QuestionParagraph/Component'
import { QuestionParagraphPropsType } from '../../component/QuestionComponents/QuestionParagraph/interface'
const meta = {
  title: 'QuestionParagraph',
  component: Component,
} as Meta
export default meta
const Template: StoryFn<QuestionParagraphPropsType> = (
  args: QuestionParagraphPropsType
) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  text: 'text',
  isCenter: true,
}
