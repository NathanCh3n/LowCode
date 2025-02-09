import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 10000,
})

instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  console.log('resData', resData)
  const { errno, data, msg } = resData
  if (errno !== 0) {
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg || '未知错误')
  }
  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

// key表示字段名，any表示字段值的类型
export type ResDataType = {
  [key: string]: any
}
