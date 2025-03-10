import React, { FC, useState } from 'react'
import { Button, Input, Typography, Space, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import EditToolbar from './EditToolbar'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { updateQuestionService } from '../../../services/question'

// 标题组件
const TitleElem: FC = () => {
  const { Title } = Typography
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  const [editTitle, setEditTitle] = useState(false)
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (newTitle === '') {
      message.info('标题不能为空')
      return
    }
    dispatch(changePageTitle(newTitle))
  }
  return editTitle ? (
    <Input
      type="text"
      value={title}
      onChange={changeTitle}
      onClick={e => e.stopPropagation()}
      onPressEnter={() => setEditTitle(false)}
      onBlur={() => setEditTitle(false)}
    />
  ) : (
    <Space>
      <Title style={{ fontSize: '18px' }} onClick={() => setEditTitle(true)}>
        {title}
      </Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setEditTitle(true)}
      />
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
      })
    },
    {
      manual: true,
    }
  )
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })
  // 自动保存
  useDebounceEffect(
    () => {
      if (!id) return
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )
  return (
    <Button
      type="primary"
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const nav = useNavigate()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
      })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )
  return (
    <Button
      type="primary"
      onClick={pub}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
