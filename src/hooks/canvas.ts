import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { canvasSlice } from "../redux/features/canvasSlice"
import { useSettings } from "./settings"
import { useDimensions } from "./dimensions"
import { useState } from "react"
import { SelectedCell } from "../models/Cell"

export const useCanvas = () => {
  const dispatch = useDispatch()
  const canvasSelector = useSelector((state: RootState) => state.canvas)
  const { ctx, cells } = canvasSelector
  const actions = bindActionCreators({ ...canvasSlice.actions }, dispatch)
  const { setCtx, setCells } = actions
  const { rows, cols } = useSettings()
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)
  const { SIZES, cellWidth, cellHeight } = useDimensions()

  const initializeCells = () => {
    const newCells = []
    if (SIZES) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * cellWidth + SIZES.tableX
          const y = i * cellHeight + SIZES.tableY

          newCells.push({
            colIndex: j,
            rowIndex: i,
            x,
            y,
            initX: x,
            initY: y,
            isCorrect: false,
          })
        }
      }
      setCells(newCells)
    }
  }

  return {
    ctx,
    setCtx,
    cells,
    setCells,
    initializeCells,
    selectedCell,
    setSelectedCell,
  }
}
