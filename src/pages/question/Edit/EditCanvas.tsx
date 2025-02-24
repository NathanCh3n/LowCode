import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
// import QuestionTitle from '../../../component/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '../../../component/QuestionComponents/QuestionInput/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../component/QuestionComponents'
import { ComponentInfoType } from '../../../store/componentReducer'

type PropsType = {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (!componentConf) {
    return null
  }
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c
        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )

  // <div className={styles.canvas}>
  //   <div className={styles['component-wrapper']}>
  //     <div className={styles.component}>
  //       <QuestionTitle />
  //     </div>
  //   </div>
  //   <div className={styles['component-wrapper']}>
  //     <div className={styles.component}>
  //       <QuestionInput />
  //     </div>
  //   </div>
  // </div>
}

export default EditCanvas
