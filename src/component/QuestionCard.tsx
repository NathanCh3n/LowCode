import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Divider, Space, Tag, message, Modal, Popconfirm } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  updateQuestionService,
  duplicateQuestionService,
} from '../services/question'
import styles from './QuestionCard.module.scss'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props
  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar)
  const nav = useNavigate()
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )
  // 复制功能实现
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        message.success('复制成功')
        nav(`/question/edit/${res.id}`)
      },
    }
  )
  // 删除功能实现
  function del() {
    confirm({
      title: '删除问卷',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        message.success('删除成功')
      },
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={
              isPublished ? `/quest ion/stat/${_id}` : `/question/edit/${_id}`
            }
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <Tag>答卷: {answerCount}</Tag>
            <Tag>{createdAt}</Tag>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消星标' : '星标'}
            </Button>
            <Popconfirm
              title="确认复制吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
