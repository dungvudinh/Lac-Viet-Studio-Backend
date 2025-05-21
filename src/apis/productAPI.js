
import axiosClient from '~/configs/axios'
export const fetchGetAllProductAPI = async (productCatalogSlug) => await axiosClient.get(`v1/${productCatalogSlug}/products`)
export const fetchCreateProductAPI = async (productCatalogSlug, formData) =>
{
  return await axiosClient.post(`v1/${productCatalogSlug}/products`, formData, {
    headers:{
      'Content-Type':'multipart/form-data'
    }
  })
}
export const fetchDeleteProductAPI = async (productCatalogSlug, productId) => await axiosClient.delete(`v1/${productCatalogSlug}/products/${productId}`)
export const fetchUpdateProductAPI = async (productCatalogSlug, productId, formData) => await axiosClient.put(`v1/${productCatalogSlug}/products/${productId}`, formData, { headers:{ 'Content-Type':'multipart/form-data' } })
