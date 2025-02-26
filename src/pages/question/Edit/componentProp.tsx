import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  getComponentConfByType,
  ComponentPropsType,
} from '../../../component/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentReducer'

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>请先选择组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent) return <NoProp />
  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProp />
  const { PropComponent } = componentConf
  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    dispatch(changeComponentProps({ fe_id: selectedComponent.fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} />
}
export default ComponentProp
