import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  clearCopiedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import React, { FC } from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent, componentList, copiedComponent } =
    useGetComponentInfo()
  const { isLocked, fe_id } = selectedComponent || {}
  const selectIndex = componentList.findIndex(c => c.fe_id === fe_id)
  const isFirst = selectIndex === 0
  const isLast = selectIndex === componentList.length - 1

  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }
  const handleHide = () => {
    if (fe_id) {
      dispatch(changeComponentHidden({ fe_id, isHidden: true }))
    }
  }
  const handleLock = () => {
    if (fe_id) {
      dispatch(toggleComponentLocked({ fe_id }))
    }
  }
  const handleCopy = () => {
    if (copiedComponent) {
      dispatch(clearCopiedComponent())
    } else {
      dispatch(copySelectedComponent())
    }
  }
  const handlePaste = () => {
    dispatch(pasteCopiedComponent())
  }
  const handleUp = () => {
    dispatch(
      moveComponent({ oldIndex: selectIndex, newIndex: selectIndex - 1 })
    )
  }
  const handleDown = () => {
    dispatch(
      moveComponent({ oldIndex: selectIndex, newIndex: selectIndex + 1 })
    )
  }
  // 撤销
  const handleUndo = () => {
    dispatch(UndoActionCreators.undo())
  }
  // 重做
  const handleRedo = () => {
    dispatch(UndoActionCreators.redo())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button
          type="default"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          type="default"
          shape="circle"
          icon={<EyeInvisibleOutlined onClick={handleHide} />}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          type={isLocked ? 'primary' : 'default'}
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button
          type={copiedComponent ? 'primary' : 'default'}
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          type="default"
          shape="circle"
          icon={<BlockOutlined />}
          disabled={!copiedComponent}
          onClick={handlePaste}
        />
      </Tooltip>
      <Tooltip title="上移">
        <Button
          type="default"
          shape="circle"
          icon={<UpOutlined />}
          onClick={handleUp}
          disabled={isFirst}
        />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          type="default"
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleDown}
          disabled={isLast}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          type="default"
          shape="circle"
          icon={<UndoOutlined />}
          onClick={handleUndo}
        />
      </Tooltip>
      <Tooltip title="重做">
        <Button
          type="default"
          shape="circle"
          icon={<RedoOutlined />}
          onClick={handleRedo}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
