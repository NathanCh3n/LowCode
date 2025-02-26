import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentReducer'

function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state: StateType) => state.components
  ) as ComponentsStateType
  const { componentList = [], selectedId } = components
  return { componentList, selectedId }
}

export default useGetComponentInfo
