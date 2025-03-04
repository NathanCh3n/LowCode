import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../component/QuestionComponents'
import classNames from 'classnames'
import {
  ComponentInfoType,
  changeSelectedId,
} from '../../../store/componentReducer'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../component/DragSortable/SortableContainer'
import SortableItem from '../../../component/DragSortable/SortableItem'
import { moveComponent } from '../../../store/componentReducer'

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
  useBindCanvasKeyPress()
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
  // 拖拽排序
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c
            // 拼接 class name
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const locked = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [locked]: isLocked,
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  key={fe_id}
                  className={wrapperClassName}
                  onClick={e => handleClick(e, fe_id || '')}
                >
                  <div className={styles.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
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
