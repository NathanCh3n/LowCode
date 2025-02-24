import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await getQuestionService(id)
  //     setQuestionData(res)
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])
  async function load() {
    const data = await getQuestionService(id)
    return data
  }
  const { data, loading } = useRequest(load)
  return { data, loading }
}

export default useLoadQuestionData
