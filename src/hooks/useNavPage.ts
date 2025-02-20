import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from '../router'
import useGetUserInfo from './useGetUserInfo'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
