import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { gameSlice } from "../redux/features/gameSlice"
import { useCanvas } from "./canvas"
import { useEffect } from "react"

const useGame = () => {
  const dispatch = useDispatch()
  const canvasSelector = useSelector((state: RootState) => state.game)
  const { isGame, isDrawing, isWin } = canvasSelector
  const actions = bindActionCreators({ ...gameSlice.actions }, dispatch)
  const { setIsDrawing, setIsGame, setIsWin } = actions

  const { cells } = useCanvas()
  useEffect(() => {
    if (isGame) {
      const isAllCellsCorrect =
        cells.filter((cell) => !cell.isCorrect).length < 1
      if (isAllCellsCorrect) {
        setIsWin(true)
      }
    }
  }, [cells, isGame])

  return {
    isGame,
    isDrawing,
    setIsDrawing,
    setIsGame,
    setIsWin,
    isWin,
  }
}

export default useGame
