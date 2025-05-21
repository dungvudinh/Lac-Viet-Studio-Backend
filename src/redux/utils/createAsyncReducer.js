const createAsyncReducer = (builder, asyncThunk, stateKey) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.loading = false
      state[stateKey] = action.payload // Store response data in the provided key
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
}

export default createAsyncReducer