import React, { FC } from 'react'
import { componentConfGroup } from '../../../component/QuestionComponents'
import { Typography } from 'antd'
import { ComponentConfType } from '../../../component/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentReducer'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

const Lib: FC = () => {
  const dispatch = useDispatch()
  function genComponent(c: ComponentConfType) {
    const { type, Component } = c

    function handleClick(c: ComponentConfType) {
      const { title, type, defaultProps } = c

      dispatch(
        addComponent({
          fe_id: nanoid(),
          type,
          title,
          props: defaultProps,
        })
      )
    }

    return (
      <div key={type} className={styles.wrapper} onClick={() => handleClick(c)}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }
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
