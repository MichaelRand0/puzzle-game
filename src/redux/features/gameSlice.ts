import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  isGame: boolean
  isDrawing: boolean
  isWin: boolean
  photoIndex: number
}

const initialState: IState = {
  isGame: false,
  isDrawing: false,
  isWin: false,
  photoIndex: 0
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsGame(state, action: PayloadAction<boolean>) {
      state.isGame = action.payload
    },
    setIsDrawing(state, action: PayloadAction<boolean>) {
      state.isDrawing = action.payload
    },
    setIsWin(state, action: PayloadAction<boolean>) {
      state.isWin = action.payload
    },
    setPhotoIndex(state, action: PayloadAction<number>) {
      state.photoIndex = action.payload
    },
  },
})
