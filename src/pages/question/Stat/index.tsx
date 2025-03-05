import React, { FC } from 'react'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './index.module.scss'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

  useTitle(`问卷统计 - ${title}`)
  const nav = useNavigate()

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  // Content Elem
  function genContentElem() {
    console.log('isPublished', isPublished)
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <Result
          status="warning"
          title="该页面尚未发布"
          extra={
            <Button type="primary" onClick={() => nav(-1)}>
              返回
            </Button>
          }
        />
      )
    }
    return (
      <>
        <div className={styles.left}>左侧</div>
        <div className={styles.main}>中间</div>
        <div className={styles.right}>右侧</div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div>Header</div>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  )
}

export default Edit
