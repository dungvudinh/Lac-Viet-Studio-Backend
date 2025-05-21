import axiosClient from '~/configs/axios'
export const fetchGetAllProductCatalogAPI= async () => await axiosClient.get('v1/product-catalogs')
export const fetchCreateProductCatalogAPI = async (data) => await axiosClient.post('v1/product-catalogs', data)
export const fetchDeleteProductCatalogAPI = async (productCatalogId) => await axiosClient.delete(`v1/product-catalogs/${productCatalogId}`)
export const fetchUpdateProductCatalogAPI = async (data) => await axiosClient.put('v1/product-catalogs', data)
