import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentsStateType } from './componentReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType> // 增加了 undo 功能
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // 没有 undo
    // components: componentReducer,
    // 有 undo
    components: undoable(componentReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponentList',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: pageInfoReducer,
  },
})
