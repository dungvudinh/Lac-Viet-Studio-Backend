import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchGetAllProductAPI } from '~/apis/productAPI'
export const fetchProducts= createAsyncThunk('product/fetchAll', async (productCatalogSlug) => {
  const response = await fetchGetAllProductAPI(productCatalogSlug)
  return response.data;
})