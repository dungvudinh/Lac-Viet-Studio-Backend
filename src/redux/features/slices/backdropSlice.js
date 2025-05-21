import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen:false
}

const backdropSlice = createSlice({
  name: 'backdrop', 
  initialState, 
  reducers:{
    setBackdrop: (state, action) => {
      state.isOpen = action.payload
    }
  }
})

export const { setBackdrop } = backdropSlice.actions
export default backdropSlice.reducer