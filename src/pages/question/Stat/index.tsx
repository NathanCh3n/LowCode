import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { id = '' } = useParams()
  const { loading } = useLoadQuestionData()

  return (
    <div>
      <h1>Stat {id}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Test</p>
        </div>
      )}
    </div>
  )
}

export default Edit
