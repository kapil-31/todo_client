import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/board_slice'

export const store = configureStore({
  reducer: {
    Boards: todoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
