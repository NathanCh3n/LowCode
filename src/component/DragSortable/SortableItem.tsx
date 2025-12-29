import React, { FC, ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type PropsType = {
  id: string
  children: ReactNode
}

const SortableItem: FC<PropsType> = ({ id, children }) => {
  // useSortable 用于创建可排序的容器, 返回的对象包含了容器的属性和事件
  // id 用于设置容器的 id
  // attributes 用于设置容器的属性
  // listeners 用于设置容器的事件
  // setNodeRef 用于设置容器的 ref
  // transform 用于设置容器的 transform 属性
  // transition 用于设置容器的 transition 属性
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    })
  // style 用于设置容器的样式
  // transform 用于设置容器的 transform 属性
  // transition 用于设置容器的 transition 属性
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    // 容器
    // ref 用于设置容器的 ref
    // style 用于设置容器的样式
    // attributes 用于设置容器的属性
    // listeners 用于设置容器的事件
    // children 用于设置容器的子元素
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
