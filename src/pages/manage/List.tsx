import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import { Typography, Spin, Empty, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import styles from './common.module.scss'
import QuestionCard from '../../component/QuestionCard'
import ListSearch from '../../component/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { useRequest, useDebounceFn } from 'ahooks' // 导入useDebounceFn
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant'
import { getQuestionListService } from '../../services/question'

const { Title } = Typography

const List: FC = () => {
  // 基础状态定义
  const [page, setPage] = useState(1)
  const [list, setList] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const loaderRef = useRef<HTMLDivElement>(null)

  // 判断是否有更多数据可加载
  const hasMore = useMemo(() => {
    const result = list.length < total
    console.log(
      'hasMore计算 - list长度:',
      list.length,
      'total:',
      total,
      '结果:',
      result
    )
    return result
  }, [list.length, total])

  // 关键点1：使用更可靠的数据加载请求
  const { loading, run: loadData } = useRequest(
    async (currentPage: number) => {
      console.log('开始加载页面:', currentPage, '关键字:', keyword)
      try {
        const data = await getQuestionListService({
          page: currentPage,
          pageSize: LIST_PAGE_SIZE,
          keyword,
          isDeleted: false, // 明确指定不获取已删除的问卷
        })
        // 检查数据结构
        if (!data) {
          console.error('API返回数据为空')
          return { list: [], total: 0 }
        }

        // 检查是否需要处理data.data情况
        if (data.data && typeof data.data === 'object') {
          return data.data
        }

        return data
      } catch (error) {
        console.error('加载数据出错:', error)
        return { list: [], total: 0 }
      }
    },
    {
      manual: true,
      onSuccess: (res, params) => {
        const currentPage = params[0] as number
        const { count: totalCount, list: newList = [] } = res
        // 关键点2：处理列表数据更新
        if (currentPage === 1) {
          // 首页加载 - 替换数据
          setList(newList)
        } else {
          // 更多数据 - 追加数据
          setList(prevList => [...prevList, ...newList])
        }

        setTotal(totalCount)
        setIsLoadingMore(false)
      },
      onError: () => {
        setIsLoadingMore(false)
      },
    }
  )

  // 初始加载 - 添加组件挂载时的数据加载
  useEffect(() => {
    console.log('组件挂载 - 初始加载')
    loadData(1)
  }, []) // 仅在组件挂载时执行一次

  // 关键点3：当搜索条件变化时重置并重新加载
  useEffect(() => {
    // 只有在非初始加载时才触发（避免重复加载）
    if (keyword !== '') {
      // 当keyword有值时才触发重置和加载
      console.log('搜索条件变化 - 重置并重新加载')
      setPage(1)
      setList([])
      setTotal(0)
      loadData(1)
    }
  }, [keyword])

  // 使用防抖函数处理加载更多操作
  const { run: debouncedLoadMore } = useDebounceFn(
    () => {
      console.log('触发防抖加载更多')
      if (isLoadingMore || loading) return // 防止重复加载

      setIsLoadingMore(true)
      const nextPage = page + 1
      console.log('加载下一页:', nextPage)
      setPage(nextPage)
      loadData(nextPage)
    },
    { wait: 200 } // 设置200ms的防抖等待时间
  )

  // 关键点4：使用Intersection Observer API实现更可靠的无限滚动
  useEffect(() => {
    // 如果没有更多数据或正在加载，不设置观察者
    if (!hasMore || loading || isLoadingMore) {
      console.log(
        '跳过Observer设置 - hasMore:',
        hasMore,
        'loading:',
        loading,
        'isLoadingMore:',
        isLoadingMore
      )
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        // 当观察的元素进入视口
        if (entries[0].isIntersecting) {
          console.log('加载触发元素进入视口 - 调用防抖函数')
          debouncedLoadMore() // 使用防抖函数替代直接加载
        }
      },
      { threshold: 0.1 } // 降低阈值，使其更容易触发
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [hasMore, loading, isLoadingMore, page, debouncedLoadMore])

  // 关键点5：添加手动刷新功能
  const handleRefresh = () => {
    console.log('手动刷新')
    setPage(1)
    setList([])
    setTotal(0)
    loadData(1)
  }

  // 渲染底部加载状态
  const renderFooter = () => {
    if (loading && page === 1) return null // 首次加载由整页loading处理

    if (list.length === 0) return null // 无数据时不显示底部

    if (isLoadingMore) {
      return <Spin tip="加载中..." />
    }

    if (!hasMore) {
      return <div>没有更多了...</div>
    }

    return <div>向下滚动加载更多</div>
  }

  // 添加调试面板（仅在开发环境显示）
  const renderDebugPanel = () => {
    if (process.env.NODE_ENV !== 'development') return null

    return (
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          borderRadius: 4,
          fontSize: 12,
          zIndex: 9999,
        }}
      >
        <div>页码: {page}</div>
        <div>列表项数: {list.length}</div>
        <div>总数: {total}</div>
        <div>加载中: {loading ? '是' : '否'}</div>
        <div>加载更多中: {isLoadingMore ? '是' : '否'}</div>
        <div>有更多数据: {hasMore ? '是' : '否'}</div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            style={{ marginRight: '10px' }}
          >
            刷新
          </Button>
          <ListSearch />
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {/* 首次加载时显示加载状态 */}
        {loading && page === 1 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin size="large" tip="加载中..." />
          </div>
        )}

        {/* 无数据时显示空状态 */}
        {!loading && list.length === 0 && (
          <Empty description="暂无问卷数据" style={{ padding: '40px 0' }} />
        )}

        {/* 问卷列表 */}
        {list.map(question => {
          const { _id } = question
          return <QuestionCard key={_id} {...question} />
        })}
      </div>

      {/* 底部加载区域 */}
      <div
        className={styles.footer}
        style={{ textAlign: 'center', padding: '20px 0' }}
        ref={loaderRef}
      >
        {renderFooter()}
      </div>

      {/* 调试面板 */}
      {renderDebugPanel()}
    </>
  )
}

export default List
