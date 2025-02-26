import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../component/QuestionComponents'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  // 其他拓展
}

export const componentsSlice = createSlice({
  name: 'component',
  initialState: INIT_STATE,
  reducers: {
    resetComponentList: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload
    },
    changeSelectedId: (
      draft: ComponentsStateType,
      action: PayloadAction<string>
    ) => {
      draft.selectedId = action.payload || ''
    },
    addComponent: (
      draft: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>
    ) => {
      const newCompontent = action.payload
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      if (index < 0) {
        draft.componentList.push(newCompontent)
      } else {
        draft.componentList.splice(index + 1, 0, newCompontent)
      }
      draft.selectedId = newCompontent.fe_id
    },
    changeComponentProps: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload
      const component = draft.componentList.find(c => c.fe_id === fe_id)
      if (component) {
        component.props = {
          ...component.props,
          ...newProps,
        }
      }
    },
    removeSelectedComponent: (draft: ComponentsStateType) => {
      const { selectedId: removeId, componentList } = draft
      // 重新计算 selectedId, 优先选择下一个，没有下一个则选择上一个
      const nextSelectedId = getNextSelectedId(removeId, componentList)
      draft.selectedId = nextSelectedId
      // 删除组件
      const index = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(index, 1)
    },
  },
})

export const {
  resetComponentList,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
