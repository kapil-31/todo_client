import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    // reducres bind here
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
