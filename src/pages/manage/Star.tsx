import React, { FC, useState } from 'react'
import { Empty, Typography } from 'antd'
import QuestionCard from '../../component/QuestionCard'
import styles from './common.module.scss'

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
    isPublished: false,
    isStar: true,
    answerCount: 0,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 0,
    createdAt: '3月10日 13:23',
  },
]

const Star: FC = () => {
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}> (搜索) </div>
      </div>
      <div className={styles.content}>
        {questionList.length !== 0 ? (
          questionList.map(question => {
            const { _id } = question
            return <QuestionCard key={_id} {...question} />
          })
        ) : (
          <Empty description={'暂无数据'} />
        )}
      </div>
      {questionList.length > 0 && <div className={styles.footer}>分页</div>}
    </>
  )
}

export default Star
