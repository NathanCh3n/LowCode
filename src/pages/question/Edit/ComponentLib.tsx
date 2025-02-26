import React, { FC } from 'react'
import { componentConfGroup } from '../../../component/QuestionComponents'
import { Typography } from 'antd'
import { ComponentConfType } from '../../../component/QuestionComponents'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { Component } = c
  return (
    <div className={styles.wrapper}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((item, index) => {
        const { groupId, groupName } = item
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}
            >
              {groupName}
            </Title>
            <div>{item.components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}
export default Lib
