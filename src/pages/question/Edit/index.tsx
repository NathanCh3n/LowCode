import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { id = '' } = useParams()
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <h1>Edit {id}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  )
}

export default Edit
