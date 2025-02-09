import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

type optionType = {
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

function useLoadQuestionListData(opt: Partial<optionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  const {
    data = {},
    loading,
    error,
  } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const data = await getQuestionListService({ keyword, isStar, isDeleted })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error }
}

export default useLoadQuestionListData
