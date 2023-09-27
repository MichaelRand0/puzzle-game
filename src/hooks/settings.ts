import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { settingsSlice } from "../redux/features/settingsSlice"

export const useSettings = () => {
  const dispatch = useDispatch()
  const settingsSelector = useSelector((state: RootState) => state.settings)
  const { rows, cols, speed, direction } = settingsSelector
  const actions = bindActionCreators({ ...settingsSlice.actions }, dispatch)
  const { setRows, setCols, setSpeed, setDirection } = actions

  return { rows, cols, setRows, setCols, speed, setSpeed, direction, setDirection }
}
