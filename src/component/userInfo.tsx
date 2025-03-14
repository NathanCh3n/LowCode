import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const { username, nickname } = useGetUserInfo()
  const logout = () => {
    dispatch(logoutReducer()) // 清空 redux user 中的数据
    removeToken() // 清空 token 的存储
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }
  const UserInfo = () => {
    return (
      <>
        <span style={{ color: '#e8e8e8' }}>
          <UserOutlined />
          {nickname || username}
        </span>
        <Button type="link" onClick={logout}>
          退出
        </Button>
      </>
    )
  }
  const Login = () => {
    return (
      <>
        <Link to={LOGIN_PATHNAME}>登陆</Link>
      </>
    )
  }
  return <div>{username ? <UserInfo /> : <Login />}</div>
}

export default UserInfo
