import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import { Typography, Spin, Empty } from 'antd'
import styles from './common.module.scss'
import QuestionCard from '../../component/QuestionCard'
import ListSearch from '../../component/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useTitle } from 'ahooks'
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant'
import { getQuestionListService } from '../../services/question'
import { useRequest } from 'ahooks'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷')
  const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1) // List 内部的数据，不在 url 参数上体现
  const [list, setList] = useState([]) // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams() // url 参数，没有 page 参数，但有 keyword 参数
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess: res => {
        const { list: l = [], total = 0 } = res
        setList(list.concat(l)) // 累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (!haveMoreData) return <span>没有更多了...</span>
    if (total === 0) return <Empty>暂无数据</Empty>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

  // 触发加载更多
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect === null) return
      const { bottom } = domRect
      if (bottom <= document.documentElement.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  // 当页面加载，或者url参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  // 当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    // 解除绑定事件，重要！！
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
