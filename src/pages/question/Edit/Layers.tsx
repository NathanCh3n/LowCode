import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './Layers.module.scss'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Input, Space, Button } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeSelectedId,
  changeCompnentTitle,
  changeComponentHidden,
  toggleComponentLocked,
} from '../../../store/componentReducer'
import { message } from 'antd'
import classNames from 'classnames'
import SortableContainer from '../../../component/DragSortable/SortableContainer'
import SortableItem from '../../../component/DragSortable/SortableItem'
import { moveComponent } from '../../../store/componentReducer'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const [changingTitleId, setchangingTitleId] = useState('')

  const dispatch = useDispatch()
  const handleTitleClick = (fe_id: string) => {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('该组件已隐藏，无法选中')
      return
    }
    if (selectedId !== fe_id) {
      dispatch(changeSelectedId(fe_id))
      setchangingTitleId('')
      return
    }
    setchangingTitleId(fe_id)
  }
  function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim()
    if (newTitle === '') {
      message.info('标题不能为空')
      return
    }
    dispatch(changeCompnentTitle({ fe_id: changingTitleId, title: newTitle }))
  }
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
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
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        const wrapperClassName = classNames(styles.wrapper, {
          [styles.selected]: selectedId === fe_id, // 将选中样式应用到容器
        })
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => handleTitleClick(fe_id)}
            >
              <div className={styles.title}>
                {changingTitleId === fe_id ? (
                  <Input
                    type="text"
                    value={title}
                    onChange={changeTitle}
                    onClick={e => e.stopPropagation()} // 阻止输入框点击冒泡
                    onBlur={() => setchangingTitleId('')}
                    onPressEnter={() => setchangingTitleId('')}
                  />
                ) : (
                  title
                )}
              </div>
              <div>
                <Space>
                  <Button
                    icon={<EyeInvisibleOutlined />}
                    shape="circle"
                    type={isHidden ? 'primary' : 'default'}
                    onClick={e => {
                      e.stopPropagation()
                      changeHidden(fe_id, !isHidden)
                    }}
                  />
                  <Button
                    icon={<LockOutlined />}
                    shape="circle"
                    type={isLocked ? 'primary' : 'default'}
                    onClick={e => {
                      e.stopPropagation()
                      changeLocked(fe_id)
                    }}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
