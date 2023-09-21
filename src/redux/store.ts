import { configureStore } from '@reduxjs/toolkit'
import { settingsSlice } from './features/settingsSlice'
import { canvasSlice } from './features/canvasSlice'

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    canvas: canvasSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch