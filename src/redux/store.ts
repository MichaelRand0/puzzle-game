import { configureStore } from '@reduxjs/toolkit'
import { settingsSlice } from './features/settingsSlice'
import { canvasSlice } from './features/canvasSlice'
import { gameSlice } from './features/gameSlice'
import { modalSlice } from './features/modalSlice'

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    canvas: canvasSlice.reducer,
    game: gameSlice.reducer,
    modal: modalSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch