import React, { FC, useState } from 'react'
import { Button, Input, Typography, Space, message } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'
import { useNavigate } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import EditToolbar from './EditToolbar'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'

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
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
