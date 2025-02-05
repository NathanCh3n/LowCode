import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import { BlockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <BlockOutlined />
          </Title>
          <Title>吐司问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
