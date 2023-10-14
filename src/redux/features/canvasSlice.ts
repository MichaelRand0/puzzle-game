// @ts-nocheck

import { Cell } from "@/src/models/Cell"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  ctx: CanvasRenderingContext2D | null
  cells: Cell[]
  img: any
  isReady: boolean
}

const initialState: IState = {
  ctx: null,
  cells: []
}

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCtx(state, action:PayloadAction<CanvasRenderingContext2D>) {
      state.ctx = action.payload
    },
    setCells(state, action: PayloadAction<Cell[]>) {
      state.cells = action.payload
    },
    setImg(state, action: PayloadAction<any>) {
      state.img = action.payload
    },
    setIsReady(state, action: PayloadAction<boolean>) {
      state.isReady = action.payload
    },
  },
})
