import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染属性
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="问卷标题" desc="问卷描述" />) // 渲染属性
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument()
  const d = screen.getByText('问卷描述')
  expect(d).toBeInTheDocument()
})

test('多行文字', () => {
  render(<Component desc={'a\nb\nc'} />) // 渲染属性
  const d = screen.getByText('a')
  expect(d).toBeInTheDocument()
  expect(d).toHaveTextContent('a')
  expect(d).not.toHaveTextContent('ab')
})
