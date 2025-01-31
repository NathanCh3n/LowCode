import React, { FC, useState } from 'react'
import produce from 'immer'
import QuestionCard from './component/QuestionCard'

const List2: FC = () => {
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])

  function add() {
    const r = Math.floor(Math.random() * 1000).toString()
    // setQuestionList(
    //   questionList.concat({
    //     id: 'q' + r,
    //     title: '问卷' + r,
    //     isPublished: false,
    //   })
    // )

    // use immer to update state
    setQuestionList(
      produce(questionList, draft => {
        draft.push({
          id: 'q' + r,
          title: '问卷' + r,
          isPublished: false,
        })
      })
    )
  }

  function deleteQuestion(id: string) {
    // setQuestionList(questionList.filter(item => item.id !== id))

    // use immer to update state
    setQuestionList(
      produce(questionList, draft => {
        return draft.filter(item => item.id !== id)
      })
    )
    // or use splice
    // setQuestionList(
    //   produce(questionList, draft => {
    //     const index = draft.findIndex(item => item.id === id)
    //     draft.splice(index, 1)
    //   })
    // )
  }

  function publishQuestion(id: string) {
    // setQuestionList(
    //   questionList.map(item => (item.id === id ? { ...item, isPublished: true } : item))
    // )

    // use immer to update state
    setQuestionList(
      produce(questionList, draft => {
        const q = draft.find(item => item.id === id)
        if (q) q.isPublished = true
      })
    )
  }

  return (
    <div>
      <h1>问卷列表页2</h1>
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
              publishQuestion={publishQuestion}
              deleteQuestion={deleteQuestion}
            ></QuestionCard>
          )
        })}
      </div>
      <div>
        <button onClick={add}>新增问卷</button>
      </div>
    </div>
  )
}

export default List2
