import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchGetAllProductCatalogAPI } from '~/apis/productCatalogAPI'
export const fetchProductCatalogs = createAsyncThunk('productCatalog/fetchAll', async () => {
  const response = await fetchGetAllProductCatalogAPI()
  return response.data
})