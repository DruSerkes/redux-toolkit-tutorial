import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showError: ''
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    clearError: () => initialState,
    showError: (state, { payload }) => {
      state.showError = payload
    },
  }
})

export const {
  reducer: errorReducer,
  actions: { showError, clearError },
} = errorSlice;