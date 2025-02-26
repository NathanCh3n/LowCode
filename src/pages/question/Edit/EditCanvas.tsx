import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
// import QuestionTitle from '../../../component/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '../../../component/QuestionComponents/QuestionInput/Component'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../component/QuestionComponents'
import classNames from 'classnames'
import {
  ComponentInfoType,
  changeSelectedId,
} from '../../../store/componentReducer'

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
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id } = c
          // 拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
          })

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={e => handleClick(e, fe_id || '')}
            >
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
