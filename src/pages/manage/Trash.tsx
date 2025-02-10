import React, { FC, useState } from 'react'
import {
  Empty,
  Typography,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Spin,
} from 'antd'
import { useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from './common.module.scss'
import ListSearch from '../../component/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../component/ListPage'

const { Title } = Typography
const { confirm } = Modal

// const rawQuestionList = [
//   {
//     _id: 'q1',
//     title: '问卷1',
//     isPublished: true,
//     isStar: true,
//     answerCount: 0,
//     createdAt: '3月10日 13:23',
//   },
//   {
//     _id: 'q2',
//     title: '问卷2',
//     isPublished: false,
//     isStar: true,
//     answerCount: 0,
//     createdAt: '3月10日 13:23',
//   },
//   {
//     _id: 'q3',
//     title: '问卷3',
//     isPublished: false,
//     isStar: true,
//     answerCount: 0,
//     createdAt: '3月10日 13:23',
//   },
// ]

const Star: FC = () => {
  useTitle('回收站')
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectionIds, setSelectionIds] = useState<string[]>([])
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? (
          <Tag key={isPublished.toString()} color="processing">
            已发布
          </Tag>
        ) : (
          <Tag key={isPublished.toString()}>未发布</Tag>
        ),
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]

  function del() {
    confirm({
      title: '确认删除问卷',
      content: '删除后无法恢复',
      cancelText: '取消',
      okText: '删除',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success(`删除 ${JSON.stringify(selectionIds)}`)
      },
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectionIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectionIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(item: { _id: string }) => item._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectionIds(selectedRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length !== 0 && TableElem}
      </div>
      {!loading && list.length > 0 && (
        <div className={styles.footer}>
          <ListPage total={total} />
        </div>
      )}
    </>
  )
}

export default Star
