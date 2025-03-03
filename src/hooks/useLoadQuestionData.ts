import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { resetComponentList } from '../store/componentReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return
    const { componentList } = data
    if (!componentList || componentList.length === 0) return
    const action = resetComponentList({ componentList })
    dispatch(action)
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return {
    loading,
    error,
  }
}

export default useLoadQuestionData
