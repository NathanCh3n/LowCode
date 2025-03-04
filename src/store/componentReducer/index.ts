import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../component/QuestionComponents'
import clonedeep from 'lodash.clonedeep'
import { getNextSelectedId, insertNewComponent } from './utils'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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
      insertNewComponent(draft, newCompontent)
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
    changeComponentHidden: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = draft
      const { isHidden, fe_id } = action.payload
      const component = draft.componentList.find(c => c.fe_id === fe_id)
      // 重新计算 selectedId, 优先选择下一个，没有下一个则选择上一个
      let newSelectedId = ''
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        newSelectedId = fe_id
      }
      draft.selectedId = newSelectedId
      if (component) {
        component.isHidden = isHidden
      }
    },
    toggleComponentLocked: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload
      const component = draft.componentList.find(c => c.fe_id === fe_id)
      if (component) {
        component.isLocked = !component.isLocked
      }
    },
    copySelectedComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent) {
        draft.copiedComponent = clonedeep(selectedComponent)
      }
    },
    clearCopiedComponent: (draft: ComponentsStateType) => {
      draft.copiedComponent = null
    },
    pasteCopiedComponent: (draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (!copiedComponent) return
      copiedComponent.fe_id = nanoid()
      insertNewComponent(draft, copiedComponent)
    },
    selectPrevComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      // 如果是第一个组件，不做任何操作
      if (index <= 0) return
      const prevComponent = componentList[index - 1]
      if (prevComponent) {
        draft.selectedId = prevComponent.fe_id
      }
    },
    selectNextComponent: (draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      if (index <= 0) return
      if (index === componentList.length - 1) return
      const nextComponent = componentList[index + 1]
      if (nextComponent) {
        draft.selectedId = nextComponent.fe_id
      }
    },
    // 修改标题组件
    changeCompnentTitle: (
      draft: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { fe_id, title } = action.payload
      const component = draft.componentList.find(c => c.fe_id === fe_id)
      if (component) {
        component.title = title
      }
    },
    // 修改组件位置
    moveComponent: (
      draft: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: curCompnentList } = draft
      const { oldIndex, newIndex } = action.payload
      draft.componentList = arrayMove(curCompnentList, oldIndex, newIndex)
      // const componentList = draft.componentList
      // const [removed] = componentList.splice(oldIndex, 1)
      // componentList.splice(newIndex, 0, removed)
    },
  },
})

export const {
  resetComponentList,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  toggleComponentLocked,
  changeComponentHidden,
  copySelectedComponent,
  clearCopiedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeCompnentTitle,
  moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
