import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { removeSelectedComponent } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import React, { FC } from 'react'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
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
    </Space>
  )
}

export default EditToolbar
