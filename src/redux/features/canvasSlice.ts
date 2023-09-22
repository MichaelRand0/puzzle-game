import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  ctx: CanvasRenderingContext2D | null
}

const initialState: IState = {
  ctx: null
}

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCtx(state, action:PayloadAction<CanvasRenderingContext2D>) {
      state.ctx = action.payload
    },
  },
})