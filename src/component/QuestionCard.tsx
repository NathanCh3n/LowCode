import React, { FC } from 'react'
import './QuestionCard.css'

type PropsType = {
  id: string
  title: string
  isPublished: boolean
  publishQuestion?: (id: string) => void
  deleteQuestion?: (id: string) => void
}

const QuestionCard: FC<PropsType> = props => {
  const { id, title, isPublished, publishQuestion, deleteQuestion } = props

  function pub(id: string) {
    if (publishQuestion) {
      publishQuestion(id)
    }
  }

  function del(id: string) {
    if (deleteQuestion) {
      deleteQuestion(id)
    }
  }

  return (
    <div key={id} className="list-item">
      <strong>{title}</strong>
      &nbsp;
      {/* 条件判断 */}
      {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
      &nbsp;
      <button
        onClick={() => {
          pub(id)
        }}
      >
        发布问卷
      </button>
      <button
        onClick={() => {
          del(id)
        }}
      >
        删除问卷
      </button>
    </div>
  )
}

export default QuestionCard
