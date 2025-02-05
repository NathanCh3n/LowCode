import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import UserInfo from '../component/userInfo'
import Logo from '../component/Logo'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        吐司问卷 &copy; 2025 - present. Created by Nathan
      </Footer>
    </Layout>
  )
}

export default MainLayout
