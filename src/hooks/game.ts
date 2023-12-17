import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { gameSlice } from "../redux/features/gameSlice"
import { useState } from "react"

const useGame = () => {
  const dispatch = useDispatch()
  const canvasSelector = useSelector((state: RootState) => state.game)
  const { isGame, isDrawing, isWin, photoIndex } = canvasSelector
  const actions = bindActionCreators({ ...gameSlice.actions }, dispatch)
  const { setIsDrawing, setIsGame, setIsWin, setPhotoIndex } = actions

  const photos = ["example.jpg", "work2.jpg", "work3.jpg"]

  return {
    isGame,
    isDrawing,
    setIsDrawing,
    setIsGame,
    setIsWin,
    isWin,
    photoIndex,
    setPhotoIndex,
    photos,
  }
}

export default useGame
