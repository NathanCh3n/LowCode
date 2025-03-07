import React, { FC, useMemo } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts'
import { QuestionRadioStatPropsType } from './interface'

function format(n: number) {
  return (n * 100).toFixed(2) + '%'
}

const StatComponet: FC<QuestionRadioStatPropsType> = (
  props: QuestionRadioStatPropsType
) => {
  const { stat } = props
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(item => {
      s += item.count
    })
    return s
  }, [stat])
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            dataKey="count"
            nameKey="name"
            isAnimationActive={false}
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={i => `${i.name}:(${format(i.count / sum)})`}
          />
          <Tooltip formatter={(value: number) => [value, '选择人数']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponet
