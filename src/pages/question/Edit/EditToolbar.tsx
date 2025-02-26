import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import {
  removeSelectedComponent,
  changeComponentHidden,
} from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import React, { FC } from 'react'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId } = useGetComponentInfo()
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }
  const handleHide = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          type="primary"
          shape="circle"
          icon={<EyeInvisibleOutlined onClick={handleHide} />}
        />
      </Tooltip>
      <Tooltip title="重做">
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
      <Tooltip title="上移">
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
      <Tooltip title="下移">
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
      <Tooltip title="复制">
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
