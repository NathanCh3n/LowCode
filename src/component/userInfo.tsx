import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import { useRequest } from 'ahooks'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}
  const logout = () => {
    removeToken()
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
