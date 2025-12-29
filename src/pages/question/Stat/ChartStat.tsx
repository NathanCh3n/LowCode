import React, { FC, useEffect, useState } from 'react'
import { Typography, Spin } from 'antd'
import { getComponentStatService } from '../../../services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../component/QuestionComponents'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = props => {
  const { selectedComponentId, selectedComponentType } = props
  const { Title } = Typography
  const { id = '' } = useParams()
  const [dataStat, setDataStat] = useState([])
  const { run, loading } = useRequest(
    async (id, selectedComponentId) => {
      const data = await getComponentStatService(id, selectedComponentId)
      return data
    },
    {
      manual: true,
      refreshDeps: [id, selectedComponentId],
      onSuccess(res) {
        const { stat } = res
        setDataStat(stat)
      },
    }
  )
  useEffect(() => {
    if (!selectedComponentId) return
    run(id, selectedComponentId)
  }, [selectedComponentId])
  function genContentElem() {
    if (!selectedComponentId)
      return (
        <div style={{ textAlign: 'center' }}>
          <Title level={4}>请选择左侧组件查看统计数据</Title>
        </div>
      )
    if (dataStat.length === 0)
      return (
        <div style={{ textAlign: 'center' }}>
          <Title level={4}>暂无数据</Title>
        </div>
      )
    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {}

    if (!StatComponent) {
      // 使用可选链操作符
      return (
        <div style={{ textAlign: 'center' }}>
          <Title level={4}>该组件暂无统计图表</Title>
        </div>
      )
    }
    // const { StatComponent } = selectComp

    return (
      <div style={{ width: '100%', height: 400 }}>
        <StatComponent stat={dataStat} />
      </div>
    )
  }
  return (
    <>
      <Title level={3}>图表统计</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && dataStat.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <Title level={4}>未选中图表组件</Title>
        </div>
      )}
      {!loading && dataStat.length > 0 && genContentElem()}
    </>
  )
}

export default ChartStat
