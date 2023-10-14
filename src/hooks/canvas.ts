import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { canvasSlice } from "../redux/features/canvasSlice"
import { useSettings } from "./settings"
import { useDimensions } from "./dimensions"
import { useState } from "react"
import { Cell, SelectedCell } from "../models/Cell"

export const useCanvas = () => {
  const dispatch = useDispatch()
  const canvasSelector = useSelector((state: RootState) => state.canvas)
  const { ctx, cells, img, isReady } = canvasSelector
  const actions = bindActionCreators({ ...canvasSlice.actions }, dispatch)
  const { setCtx, setCells, setImg, setIsReady } = actions
  const { rows, cols } = useSettings()
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)
  const { SIZES, cellWidth, cellHeight } = useDimensions()

  const initializeCells = () => {
    const newCells: Cell[] = []
    if (SIZES) {
      let cnt = 0
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * cellWidth + SIZES.tableX
          const y = i * cellHeight + SIZES.tableY

          const sgn = (Math.random() - 0.5) < 0 ? -1 : 1

          const isLastRow = i + 1 === rows
          const isLastCol = j + 1 === cols
          const isFirstRow = i === 0
          const isFirstCol = j === 0

          newCells.push({
            colIndex: j,
            rowIndex: i,
            x,
            y,
            initX: x,
            initY: y,
            isCorrect: false,
            bottomTab: isLastRow ? 0 : sgn * (Math.random() * 0.4 + 0.3),
            rightTab: isLastCol ? 0 : sgn * (Math.random() * 0.4 + 0.3),
            topTab: isFirstRow ? 0 : -Number(newCells[cnt - cols]?.bottomTab),
            leftTab: isFirstCol ? 0 : -Number(newCells[cnt - 1]?.rightTab),
          })
          cnt++
        }
      }
      setCells(newCells)
      setIsReady(true)
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
    img,
    isReady,
    setImg,
    setIsReady,
  }
}
