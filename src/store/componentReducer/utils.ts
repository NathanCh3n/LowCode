import { ComponentInfoType } from './index'

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
