import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  rows: number
  cols: number
  speed: number
}

const initialState: IState = {
  rows: 7,
  cols: 14,
  speed: 200
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setRows(state, action:PayloadAction<number>) {
      state.rows = action.payload
    },
    setCols(state, action:PayloadAction<number>) {
      state.cols = action.payload
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload
    }
  },
})
