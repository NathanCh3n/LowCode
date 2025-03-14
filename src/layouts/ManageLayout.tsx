import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Flex, Divider, message } from 'antd'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import styles from './ManageLayout.module.scss'
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  // 不采用 useRequest 的写法
  // const [loading, setLoading] = useState(false)
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const { id } = data
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoading(false)
  // }

  const { loading, run: handleCreateClick } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess: res => {
        nav(`/question/edit/${res.id || res._id}`)
        message.success('创建成功')
      },
    }
  )
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Flex gap="small" wrap>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              disabled={loading}
              onClick={handleCreateClick}
            >
              新建问卷
            </Button>
            <Divider />
            <Button
              type={pathname === '/manage/list' ? 'default' : 'text'}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => nav('/manage/list')}
            >
              我的问卷
            </Button>
            <Button
              type={pathname === '/manage/star' ? 'default' : 'text'}
              size="large"
              icon={<StarOutlined />}
              onClick={() => nav('/manage/star')}
            >
              星标问卷
            </Button>
            <Button
              type={pathname === '/manage/trash' ? 'default' : 'text'}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => nav('/manage/trash')}
            >
              回收站
            </Button>
          </Flex>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default ManageLayout
