import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获取下一个选中的组件 id
 * @param fe_id 当前选中的组件 id
 * @param componentList 组件列表
 * @returns 下一个选中的组件 id
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''
  if (index === visibleComponentList.length - 1) {
    return visibleComponentList[index - 1].fe_id
  } else {
    return visibleComponentList[index + 1].fe_id
  }
}
/**
 * 插入新组件
 * @param draft 组件状态
 * @param newCompontent 新组件
 * @returns
 */
export const insertNewComponent = (
  draft: ComponentsStateType,
  newCompontent: ComponentInfoType
) => {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)
  if (index < 0) {
    draft.componentList.push(newCompontent)
  } else {
    draft.componentList.splice(index + 1, 0, newCompontent)
  }
  draft.selectedId = newCompontent.fe_id
}
