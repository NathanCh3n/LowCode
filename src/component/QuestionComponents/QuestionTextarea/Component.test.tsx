import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染属性
  const h = screen.getByText('输入框标题')
  expect(h).toBeInTheDocument()
  const p = screen.getByPlaceholderText('请输入内容')
  expect(p).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="标题" placeholder="内容" />) // 渲染属性
  const h = screen.getByText('标题')
  expect(h).toBeInTheDocument()
  const p = screen.getByPlaceholderText('内容')
  expect(p).toBeInTheDocument()
})
