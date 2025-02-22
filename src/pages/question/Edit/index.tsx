import React, { FC } from 'react'
import styles from './index.module.scss'
// import { useParams } from 'react-router-dom'
// import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  // const { id = '' } = useParams()
  // const { loading, data } = useLoadQuestionData()

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>画布滚动测试</div>
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
