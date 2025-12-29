import React, { FC } from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface'

const StatComponet: FC<QuestionCheckboxStatPropsType> = (
  props: QuestionCheckboxStatPropsType
) => {
  const { stat } = props
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45} // 标签倾斜45度
            textAnchor="end"
            interval={0} // 强制显示所有标签
            tick={{ fontSize: 12 }} // 缩小字体
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponet
