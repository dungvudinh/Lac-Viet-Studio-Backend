import { createSlice } from '@reduxjs/toolkit'
import createAsyncReducer from '~/redux/utils/createAsyncReducer'
import { fetchProductCatalogs } from '../thunks/productCatalogThunk'

const productCatalogSlice = createSlice({
  name: 'productCatalog', 
  initialState:{
    catalog:{},
    catalogs:[],
    loading: false,
    error: null
  }, 
  reducers:{
    setCatalog:(state, action) => {
      state.catalog = action.payload
    },
    //clear data when unmounting
    resetProductCatalogState: (state) => {
      state.catalogs = []
      state.loading = false
      state.error = null
    }
  },
  extraReducers:(builder) => {
    createAsyncReducer(builder, fetchProductCatalogs, 'catalogs')
  } 
  
})

export const { setCatalog, resetProductCatalogState } = productCatalogSlice.actions
export default productCatalogSlice.reducer