import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import QuestionTitle from '../../../component/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../component/QuestionComponents/QuestionInput/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

type PropsType = {
  loading: boolean
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()
  console.log('componentList', componentList)
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
