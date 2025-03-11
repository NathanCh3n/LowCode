import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Component from '../../component/QuestionComponents/QuestionTextarea/Component'
import { QuestionTextareaPropsType } from '../../component/QuestionComponents/QuestionTextarea/interface'
const meta = {
  title: 'QuestionTextarea',
  component: Component,
} as Meta
export default meta

const Template: StoryFn<QuestionTextareaPropsType> = (
  args: QuestionTextareaPropsType
) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'title',
  placeholder: 'placeholder',
}
