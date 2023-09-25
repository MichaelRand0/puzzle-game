import { Cell } from "@/src/models/Cell"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  rows: number
  cols: number
  speed: number
}

const initialState: IState = {
  rows: 5,
  cols: 8,
  speed: 50,
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<number>) {
      state.rows = action.payload
    },
    setCols(state, action: PayloadAction<number>) {
      state.cols = action.payload
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload
    },
  },
})
