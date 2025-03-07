import React, { FC } from 'react'
import styles from './ComponentList.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../component/QuestionComponents'
import classNames from 'classnames'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedCompnentType: (type: string) => void
}

const ComponentList: FC<PropsType> = props => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedCompnentType,
  } = props
  const { componentList } = useGetComponentInfo()
  function handleClick(event: React.MouseEvent, id: string, type: string) {
    event.stopPropagation()
    setSelectedComponentId(id)
    setSelectedCompnentType(type)
  }
  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, type, props } = c
          const componentConf = getComponentConfByType(type)
          if (!componentConf) return null
          const { Component } = componentConf
          // 拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
          })

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={e => handleClick(e, fe_id, type)}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
