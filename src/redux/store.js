import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/slices/productSlice'
import productCatalogReducer from './features/slices/productCatalogSlice'
import loadingReducer from './features/slices/loadingSlice'
import alertReducer from './features/slices/alertSlice'
import backdropReducer from './features/slices/backdropSlice'
const store = configureStore({
  reducer:{
    //admin
    adminProduct: productReducer,
    adminProductCatalog: productCatalogReducer,
    sharedLoading:loadingReducer,
    sharedAlert:alertReducer,
    sharedBackdrop:backdropReducer
  }
})
export default store