import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Component from '../../component/QuestionComponents/QuestionInput/Component'
import { QuestionInputPropsType } from '../../component/QuestionComponents/QuestionInput/interface'
export default {
  title: 'QuestionInput',
  component: Component,
} as Meta
const Template: StoryFn<QuestionInputPropsType> = args => (
  <Component {...args} />
)
export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'Question Title',
  placeholder: 'Question Placeholder',
}
