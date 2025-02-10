import React, { FC } from 'react'
import { Pagination, PaginationProps } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import {
  LIST_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '../constant'

type ListPageProps = {
  total: number
}

const ListPage: FC<ListPageProps> = (props: ListPageProps) => {
  const { total } = props
  const [current, setCurrent] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(LIST_PAGE_SIZE)
  // 1. 从 URL 参数中获取 page 和 pageSize, 并同步到 Pagination 组件中
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { pathname } = useLocation()
  // 2. 当 page 或 pageSize 变化时, 更新 URL 参数
  const handleChange: PaginationProps['onChange'] = (
    pageNumber: number,
    pageSize: number
  ) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, pageNumber.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  React.useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
      LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handleChange}
    />
  )
}

export default ListPage
