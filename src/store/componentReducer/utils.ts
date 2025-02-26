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
  const index = componentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''
  if (index === componentList.length - 1) {
    return componentList[index - 1].fe_id
  } else {
    return componentList[index + 1].fe_id
  }
}
