import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Component from '../../component/QuestionComponents/QuestionInfo/Component'
import { QuestionInfoPropsType } from '../../component/QuestionComponents/QuestionInfo/interface'
const meta = {
  title: 'QuestionInfo',
  component: Component,
} as Meta
export default meta

const Template: StoryFn<QuestionInfoPropsType> = (
  args: QuestionInfoPropsType
) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'title',
  desc: 'desc',
}

export const DescBreakLine = Template.bind({})
DescBreakLine.args = {
  title: 'title',
  desc: 'desc\nbreakline',
}
