import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../component/QuestionComponents'

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
  },
})

export const {
  resetComponentList,
  changeSelectedId,
  addComponent,
  changeComponentProps,
} = componentsSlice.actions
export default componentsSlice.reducer
