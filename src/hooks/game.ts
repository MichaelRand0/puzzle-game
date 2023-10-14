import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { gameSlice } from "../redux/features/gameSlice"

const useGame = () => {
  const dispatch = useDispatch()
  const canvasSelector = useSelector((state: RootState) => state.game)
  const { isGame, isDrawing, isWin } = canvasSelector
  const actions = bindActionCreators({ ...gameSlice.actions }, dispatch)
  const { setIsDrawing, setIsGame, setIsWin } = actions

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
