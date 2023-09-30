import { Direction } from "@/src/models/Settings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  rows: number
  cols: number
  speed: number
  direction: Direction
}

const initialState: IState = {
  rows: 5,
  cols: 10,
  speed: 50,
  direction: "center",
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
    setDirection(state, action: PayloadAction<Direction>) {
      state.direction = action.payload
    },
  },
})
