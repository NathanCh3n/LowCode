import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染属性
  const h = screen.getByText('一行段落')
  expect(h).toBeInTheDocument()
})

test('多行文字', () => {
  render(<Component text={'一行段落\n两行段落\n'} />) // 渲染属性
  const h = screen.getByText('一行段落')
  expect(h).toBeInTheDocument()
  expect(h).toHaveTextContent('一行段落')
  expect(h).not.toHaveTextContent('一行段落两行段落')
})

test('传入属性', () => {
  render(<Component text="一行段落" isCenter={true} />) // 渲染属性
  const h = screen.getByText('一行段落')
  expect(h).toBeInTheDocument()
  const p = h.parentElement
  expect(p).not.toBeNull()
  const style = p!.style || {}
  expect(style.textAlign).toBe('center')
})
