import React, { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../component/QuestionCard'
import styles from './List.module.scss'

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
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}> ( 搜索) </div>
      </div>
      <div className={styles.content}>
        {questionList.map(question => {
          const { _id } = question
          return <QuestionCard key={_id} {...question} />
        })}
      </div>
      <div>footer</div>
    </>
  )
}

export default List
