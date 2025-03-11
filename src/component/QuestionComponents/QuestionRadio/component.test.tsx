import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const t = screen.getByText('单选题')
  expect(t).toBeInTheDocument()
  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`option${i}`)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
  }
})

test('传入属性', () => {
  const options = [
    { text: '选项1', value: '1' },
    { text: '选项2', value: '2' },
  ]
  const value = '1'
  render(<Component title="标题" options={options} value={value} />)
  const t = screen.getByText('标题')
  expect(t).toBeInTheDocument()
  for (let i = 1; i <= 2; i++) {
    const curVal = `${i}`
    const radio = screen.getByDisplayValue(`${i}`)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
    if (curVal === value) {
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }
})
