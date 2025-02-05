import React, { FC, useState } from 'react'
import { Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import styles from './common.module.scss'
import QuestionCard from '../../component/QuestionCard'
import ListSearch from '../../component/ListSearch'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 0,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 0,
    createdAt: '3月11日 13:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 0,
    createdAt: '3月12日 13:23',
  },
]

const List: FC = () => {
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get('keyword'))
  const [questionList] = useState(rawQuestionList)
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
        {questionList.length > 0 &&
          questionList.map(question => {
            const { _id } = question
            return <QuestionCard key={_id} {...question} />
          })}
      </div>
      <div className={styles.footer}>loadMore... 上划加载更多...</div>
    </>
  )
}

export default List
