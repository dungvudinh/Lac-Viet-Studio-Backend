import { createSlice } from '@reduxjs/toolkit'
import createAsyncReducer from '~/redux/utils/createAsyncReducer'
import { fetchProducts } from '../thunks/productThunk'

const productSlice = createSlice({
  name: 'product', 
  initialState:{
    product:{
      name:'',
      listedPrice: '', 
      sellingPrice: '', 
      age: '',
      images: ''
    },
    products:[],
    loading: false,
    error: null
  }, 
  reducers:{
    setProduct:(state, action) => {
      state.product = action.payload
    }, 
    resetProduct: (state) =>
    {
      state.product = { name:'', listedPrice:'', sellingPrice:'', age: '' }
    }, 
    resetProductState: (state) => {
      state.products = []
      state.loading = false
      state.error = null
    }
  },
  extraReducers:(builder) => {
    createAsyncReducer(builder, fetchProducts, 'products')
  }
  
})
export const { setProduct, resetProductState, resetProduct } = productSlice.actions
export default productSlice.reducer