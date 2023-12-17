import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { bindActionCreators } from "@reduxjs/toolkit"
import { modalSlice } from "../redux/features/modalSlice"

const useModal = () => {
  const dispatch = useDispatch()
  const modalSelector = useSelector((state: RootState) => state.modal)
  const { modalType } = modalSelector
  const actions = bindActionCreators({ ...modalSlice.actions }, dispatch)
  const { setModalType } = actions

  return {
    modalType,
    setModalType
  }
}

export default useModal