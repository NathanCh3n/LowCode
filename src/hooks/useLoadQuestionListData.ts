import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'

type optionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<optionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  const {
    data = {},
    loading,
    error,
    refresh,
  } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
        LIST_PAGE_SIZE
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      })
      return data

      // console.log('请求参数:', { keyword, isStar, isDeleted, page, pageSize })
      // const result = await getQuestionListService({
      //   keyword,
      //   isStar,
      //   isDeleted,
      //   page,
      //   pageSize,
      // })
      // console.log('获取问卷列表原始响应:', result)
      // // 检查数据结构
      // if (result.errno === 0) {
      //   // 如果数据在 result.data 中
      //   if (result.data && typeof result.data === 'object') {
      //     console.log('处理后的数据:', result.data)
      //     return result.data
      //   }
      //   // 如果数据直接在 result 中
      //   console.log('直接使用响应数据:', result)
      //   return result
      // }

      // console.error('API返回错误:', result)
      // return {}
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
