import React, { FC, useState } from 'react'
import { getQuestionStatListService } from '../../../services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Typography, Spin, Table, Empty, Pagination } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../constant'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedCompnentType: (type: string) => void
}
const EXCLUDE_COMPONENT_TYPES = ['questionInfo', 'questionTitle']

const PageStat: FC<PropsType> = props => {
  const { Title } = Typography
  const { id = '' } = useParams()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedCompnentType,
  } = props
  const { componentList } = useGetComponentInfo()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const { loading } = useRequest(
    async () => {
      const data = await getQuestionStatListService(id, {
        page,
        pageSize,
      })
      return data
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total = 0, list = [] } = res
        setTotal(total)
        setList(list)
      },
    }
  )
  const tableColumns = componentList
    .filter(c => !EXCLUDE_COMPONENT_TYPES.includes(c.type))
    .map(c => {
      const { fe_id, title, props, type } = c
      const colTitle = props!.title || title
      return {
        title: (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedCompnentType(type)
            }}
          >
            <span
              style={{
                color: fe_id === selectedComponentId ? '#1890ff' : 'inherit',
              }}
            >
              {colTitle}
            </span>
          </div>
        ),
        dataIndex: fe_id,
        key: fe_id,
      }
    })
  const TableElem = (
    <>
      <Table
        dataSource={list.slice((page - 1) * pageSize, page * pageSize)}
        columns={tableColumns}
        pagination={false}
        rowKey={(item: { _id: string }) => item._id}
      ></Table>
    </>
  )
  return (
    <div>
      <Title level={3}>答卷数量: {total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && list.length === 0 && <Empty description="暂无数据" />}
      {!loading && list.length !== 0 && (
        <>
          {TableElem}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Pagination
              showSizeChanger
              total={total}
              pageSize={pageSize}
              current={page}
              defaultCurrent={1}
              onChange={newPage => setPage(newPage)}
              onShowSizeChange={(page, pageSize) => {
                setPage(page)
                setPageSize(pageSize)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default PageStat
