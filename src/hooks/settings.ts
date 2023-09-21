import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { settingsSlice } from "../redux/features/settingsSlice"
import { Cell } from "../models/Cell"

export const useSettings = () => {
  const dispatch = useDispatch()
  const playerSelector = useSelector((state: RootState) => state.settings)
  const { rows, cols } = playerSelector
  const actions = bindActionCreators({ ...settingsSlice.actions }, dispatch)
  const { setRows, setCols, setSpeed } = actions

  const cells:Cell[] = []

  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      cells.push({rowIndex: i, colIndex: j})
    }
  }


  return { rows, cols, setRows, setCols, cells, setSpeed }
}
