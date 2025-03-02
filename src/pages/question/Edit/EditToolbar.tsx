import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  clearCopiedComponent,
  pasteCopiedComponent,
} from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import React, { FC } from 'react'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked, fe_id } = selectedComponent || {}
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
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
      <Tooltip title="下移">
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
