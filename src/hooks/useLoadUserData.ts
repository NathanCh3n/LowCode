import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { removeToken } from '../utils/user-token'
import { loginReducer, logoutReducer } from '../store/userReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState<boolean>(true)

  // 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: res => {
      const { username, nickname } = res
      // 存储到 Redux 中
      dispatch(loginReducer({ username, nickname }))
    },
    onError: () => {
      console.log('获取用户信息失败')
      removeToken() // 清除无效token
      dispatch(logoutReducer()) // 重置用户状态
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  useEffect(() => {
    run()
  }, [])

  // Redux 中数据
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
