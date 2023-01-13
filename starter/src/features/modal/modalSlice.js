import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isShowing: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: state => {
      state.isShowing = !state.isShowing
    }
  }
})

export const {
  reducer: modalReducer,
  actions: { toggleModal }
} = modalSlice;