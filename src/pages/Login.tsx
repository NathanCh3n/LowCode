import React, { FC, useEffect } from 'react'
import styles from './Register.module.scss'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { getUserInfoService, loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { setToken } from '../utils/user-token'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromLocalStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserFromLocalStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm() // 第三方 hook
  const nav = useNavigate()
  useEffect(() => {
    const { username, password } = getUserFromLocalStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      async onSuccess(res) {
        // Mock 数据
        // const { token = '', username, nickname } = res
        // dispatch(loginReducer({ username, nickname }))
        // setToken(token)
        // message.success('登录成功')
        // nav(MANAGE_INDEX_PATHNAME)

        const { token = '' } = res.data || res
        setToken(token)
        try {
          const userInfo = await getUserInfoService()
          const { username, nickname } = userInfo
          dispatch(loginReducer({ username, nickname }))
          message.success('登录成功')
          nav(MANAGE_INDEX_PATHNAME)
        } catch (error) {
          console.error('获取用户信息失败', error)
          message.error('登录成功，但获取用户信息失败')
        }
      },
    }
  )
  const onFinish = (values: {
    username: string
    password: string
    remember: boolean
  }) => {
    const { username, password, remember } = values || {}
    run(username, password)
    if (remember) {
      rememberUser(values.username, values.password)
    } else {
      deleteUserFromLocalStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登陆</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入你的用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space size="large">
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
