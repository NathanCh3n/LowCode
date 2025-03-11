import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Component from '../../component/QuestionComponents/QuestionTitle/Component'
import { QuestionTitlePropsType } from '../../component/QuestionComponents/QuestionTitle/interface'

export default {
  title: 'QuestionTitle',
  component: Component,
} as Meta
const Template: StoryFn<QuestionTitlePropsType> = args => (
  <Component {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  text: 'Question Title',
  isCenter: true,
  level: 1,
}
