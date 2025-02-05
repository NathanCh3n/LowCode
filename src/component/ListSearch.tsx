import React, { FC, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PLACEHOLDER } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const keyword = searchParams.get(LIST_SEARCH_PLACEHOLDER) || ''
    setValue(keyword)
    // 每当 searchParams 变化时，更新 value
  }, [searchParams])

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PLACEHOLDER}=${value}`,
    })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return (
    <Search
      placeholder="搜索"
      allowClear
      enterButton="搜索"
      size="middle"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    />
  )
}

export default ListSearch
