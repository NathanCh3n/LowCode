import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState<boolean>(false)
  const dispatch = useDispatch()

  // 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: res => {
      const { username, nickname } = res
      // 存储到 Redux 中
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // Redux 中数据
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
    }
    run()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
