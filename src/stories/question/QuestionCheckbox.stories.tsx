import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Component from '../../component/QuestionComponents/QuestionCheckbox/Component'
import { QuestionCheckboxPropsType } from '../../component/QuestionComponents/QuestionCheckbox/interface'
const meta = {
  title: 'QuestionCheckbox',
  component: Component,
} as Meta
export default meta

const Template: StoryFn<QuestionCheckboxPropsType> = (
  args: QuestionCheckboxPropsType
) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'title',
  isVertical: true,
  list: [
    { text: 'text1', value: 'value1', checked: true },
    { text: 'text2', value: 'value2', checked: false },
    { text: 'text3', value: 'value3', checked: true },
  ],
}
