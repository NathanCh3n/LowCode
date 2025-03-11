import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const t = screen.getByText('多选')
  expect(t).toBeInTheDocument()
  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`选项${i}`)
    expect(checkbox).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
    expect(checkbox.getAttribute('checked')).toBeFalsy()
  }
})

test('传入属性', () => {
  const list = [
    { text: '选项1', value: '1', checked: true },
    { text: '选项2', value: '2', checked: false },
    { text: '选项3', value: '3', checked: false },
  ]
  const length = list.length
  render(<Component title="标题" list={list} />)
  const t = screen.getByText('标题')
  expect(t).toBeInTheDocument()
  for (let i = 1; i <= length; i++) {
    const checkbox = screen.getByDisplayValue(`${i}`)
    expect(checkbox).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
    if (list[i - 1].checked) {
      expect(checkbox.getAttribute('checked')).not.toBeNull()
    } else {
      expect(checkbox.getAttribute('checked')).toBeFalsy()
    }
  }
})
