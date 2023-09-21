import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { canvasSlice } from "../redux/features/canvasSlice"

export const useCanvas = () => {
  const dispatch = useDispatch()
  const playerSelector = useSelector((state: RootState) => state.canvas)
  const { ctx } = playerSelector
  const actions = bindActionCreators({ ...canvasSlice.actions }, dispatch)
  const { setCtx } = actions

  return { ctx, setCtx }
}
