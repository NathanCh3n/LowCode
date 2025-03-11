import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Component from '../../component/QuestionComponents/QuestionRadio/Component'
import { QuestionRadioPropsType } from '../../component/QuestionComponents/QuestionRadio/interface'
const meta = {
  title: 'QuestionRadio',
  component: Component,
} as Meta
export default meta

const Template: StoryFn<QuestionRadioPropsType> = (
  args: QuestionRadioPropsType
) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'title',
  isVertical: true,
  value: 'value1',
  options: [
    { text: 'text1', value: 'value1' },
    { text: 'text2', value: 'value2' },
    { text: 'text3', value: 'value3' },
  ],
}
