import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentsStateType } from './componentReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentReducer,
    pageInfo: pageInfoReducer,
  },
})
