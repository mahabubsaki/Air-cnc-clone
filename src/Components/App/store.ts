import { configureStore } from '@reduxjs/toolkit'
import confirmReducer from './confirmReducer'
import filterReducer from './filterReducer'
import isSearchedReducer from './isSearchedReducer'

// ...

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    searched: isSearchedReducer,
    order: confirmReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch