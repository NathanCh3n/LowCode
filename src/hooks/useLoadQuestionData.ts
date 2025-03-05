import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { resetComponentList } from '../store/componentReducer'
import { setPageInfo } from '../store/pageInfoReducer'

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
    const {
      componentList = [],
      title = '',
      des = '',
      js = '',
      css = '',
      isPublished = false,
    } = data
    // 获取默认的 id
    let selectedId = ''
    if (componentList.length > 0) {
      const { fe_id } = componentList[0]
      selectedId = fe_id
    }
    // Redux 重置 componentList
    if (!componentList || componentList.length === 0) return
    const action = resetComponentList({
      componentList,
      selectedId,
      copiedComponent: null,
    })
    dispatch(action)
    // Redux 重置 pageInfo
    dispatch(setPageInfo({ title, des, js, css, isPublished }))
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
