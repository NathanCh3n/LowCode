import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componenetLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: (
        <div>
          <ComponentLib />
        </div>
      ),
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ]
  return <Tabs defaultActiveKey="componenetLib" items={tabsItems} />
}
export default LeftPanel
