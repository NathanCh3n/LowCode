import React, { FC } from 'react'
import { Typography, Spin } from 'antd'
import styles from './common.module.scss'
import QuestionCard from '../../component/QuestionCard'
import ListSearch from '../../component/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useTitle } from 'ahooks'

const { Title } = Typography

// const rawQuestionList = [
//   {
//     _id: 'q1',
//     title: '问卷1',
//     isPublished: false,
//     isStar: true,
//     answerCount: 0,
//     createdAt: '3月10日 13:23',
//   },
//   {
//     _id: 'q2',
//     title: '问卷2',
//     isPublished: true,
//     isStar: false,
//     answerCount: 0,
//     createdAt: '3月11日 13:23',
//   },
//   {
//     _id: 'q3',
//     title: '问卷3',
//     isPublished: false,
//     isStar: false,
//     answerCount: 0,
//     createdAt: '3月12日 13:23',
//   },
// ]

const List: FC = () => {
  useTitle('我的问卷')

  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [] } = data

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
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question} />
          })}
      </div>
      <div className={styles.footer}>loadMore... 上划加载更多...</div>
    </>
  )
}

export default List
