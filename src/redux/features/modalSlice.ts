import { ModalType } from "@/src/models/Modal"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
  modalType: ModalType
}

const initialState: IState = {
  modalType: 'intro',
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalType(state, action: PayloadAction<ModalType>) {
      state.modalType = action.payload
    },
  },
})
