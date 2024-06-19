import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'light'
}

export const darkModeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    darkmodefunc: (state, action) => {
      state.value = action.payload.setting
    }
  }
})

export const { darkmodefunc } = darkModeSlice.actions

export default darkModeSlice.reducer
