import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PageInfoType {
  title: string
  des?: string
  js?: string
  css?: string
}

const INIT_STATE: PageInfoType = {
  title: 'title',
  des: 'des',
  js: 'js',
  css: 'css',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    setPageInfo(state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return action.payload
    },
    changePageTitle(draft: PageInfoType, action: PayloadAction<string>) {
      draft.title = action.payload
    },
  },
})

export const { setPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
