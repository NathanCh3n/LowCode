import React, { FC, ReactNode } from 'react'
import {
  useSensor,
  useSensors,
  MouseSensor,
  DragEndEvent,
  DndContext,
  closestCenter,
} from '@dnd-kit/core'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  children: ReactNode
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props

  // useSensors 用于创建传感器
  const sensors = useSensors(
    // useSensor 用于创建鼠标传感器
    useSensor(MouseSensor, {
      // activationConstraint 用于设置激活拖拽的条件
      activationConstraint: {
        // distance 用于设置鼠标移动的距离
        distance: 8,
      },
    })
  )

  // handleDragEnd 用于处理拖拽结束
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over === null) return
    if (active.id !== over.id) {
      const activeIndex = items.findIndex(item => item.id === active.id)
      const overIndex = items.findIndex(item => item.id === over.id)
      onDragEnd(activeIndex, overIndex)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
export default SortableContainer
