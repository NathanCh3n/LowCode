import React, { FC } from 'react'
import { Empty, Typography, Spin } from 'antd'
import QuestionCard from '../../component/QuestionCard'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import ListSearch from '../../component/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../component/ListPage'

const { Title } = Typography

const Star: FC = () => {
  useTitle('星标问卷')
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question} />
          })}
      </div>
      {!loading && list.length > 0 && (
        <div className={styles.footer}>
          <ListPage total={total} />
        </div>
      )}
    </>
  )
}

export default Star
