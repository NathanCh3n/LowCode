import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentReducer'
import { useKeyPress } from 'ahooks'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

/**
 * 判断光标是否在 input 上
 * @returns
 *  true: 光标在 input 上
 *  false: 光标不在 input 上
 */
function isActiveElementValid() {
  const activeElement = document.activeElement
  // 光标没有 focus 到 ipnut 上
  if (activeElement === document.body) {
    return true
  }
  // matches() 方法检查节点是否与指定选择器匹配
  if (activeElement?.matches('div[role="button"]')) return true
  return false
}

const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  // 删除选中的组件
  useKeyPress(['Delete', 'backspace'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
  // 复制选中的组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  // 粘贴复制的组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
  // 选中上一个组件
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  // 选中下一个组件
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )
  // 重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}

export default useBindCanvasKeyPress
