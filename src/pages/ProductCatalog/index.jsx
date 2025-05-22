import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Button, TextField, Typography, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Add, ModeEditOutline, DeleteOutline, MoreHoriz } from '@mui/icons-material'
import Navigation from '~/components/Navigation'
import CustomTable from '~/components/CustomTable'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '~/redux/features/slices/loadingSlice'
import confirmAlert from '~/utils/confirmAlert'
import { fetchProductCatalogs } from '~/redux/features/thunks/productCatalogThunk'
import { resetProductCatalogState, setCatalog } from '~/redux/features/slices/productCatalogSlice'
import { useAlert } from '~/utils/alert'
import { fetchCreateProductCatalogAPI, fetchDeleteProductCatalogAPI, fetchUpdateProductCatalogAPI } from '~/apis/productCatalogAPI'
function ProductCatalog()
{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const { catalogs } = useSelector(state => state.adminProductCatalog)
  const [openCreateNew, setOpenCreateNew] = useState(false)
  useEffect(() =>
  {
    dispatch(setLoading(true))
    dispatch(fetchProductCatalogs())
    dispatch(setLoading(false))
    return () => dispatch(resetProductCatalogState()) // clear data when unmounting
  }, [])
  const handleDelete = async (_id) =>
  {
    const isConfirmed = await confirmAlert()
    if (isConfirmed)
    {
      dispatch(setLoading(true))
      try 
      {
        const res = await fetchDeleteProductCatalogAPI(_id)          
        alert('success', res.data.msg)
        dispatch(fetchProductCatalogs())
        dispatch(setLoading(false))
      }
      catch (error)
      {
        dispatch(setLoading(false))
        if (error.response && error.response.data && error.response.data.msg) {
          alert('error', error.response.data.msg)
        } else {
          alert('error', 'Có lỗi xảy ra, vui lòng thử lại')
        }
      }
    }
  }
  const handleUpdate = async (data) =>
  {
    dispatch(setCatalog(data))
    setOpenCreateNew(true)
  }
  const handleCreateNew = async () =>
  {
    setOpenCreateNew(true)
    dispatch(setCatalog({}))
  }
  const columns = [
    {
      accessorKey: 'name',
      header: 'Tên Danh Mục',
      cell: info => info.getValue()
    },
    {
      accessorKey: 'totalProduct',
      header: 'Số Lượng Sản Phẩm',
      cell: info => info.getValue()
    },
    {
      header:() => <Typography fontWeight={600}>Thao Tác</Typography>, 
      id:'action',
      classNames:'d-flex justify-content-start',
      cell:({ row }) => (
        <div>
          <ButtonGroup variant='contained'>
            <Button size='small' sx={{ backgroundColor:'#1976d2' }} onClick={() => handleUpdate(row.original)}>
              <ModeEditOutline fontSize='small'/>
            </Button>
            <Button size='small' sx={{ backgroundColor:'#d32f2f' }} onClick={() => handleDelete(row.original._id)}>
              <DeleteOutline fontSize='small'/>
            </Button>
            <Button size='small' sx={{ backgroundColor:'#42a5f5' }} onClick={() => navigate(`/product-catalogs/${row.original.slug}/products`)}>
              <MoreHoriz fontSize='small'/>
            </Button>
          </ButtonGroup>
              
        </div>
      )
    }
  ]
  return (
    <Box>
      <Navigation />
      <Box sx={{ padding:'1rem', backgroundColor:'var(--text-white)', borderRadius:'0.5rem',
        display:'flex', justifyContent:'space-between', alignItems:'center', direction:'row' }}>
        <Stack direction={'row'} sx={{ minWidth:'20rem' }} justifyContent={'space-between'} alignItems={'center'}>
          <TextField variant='standard' label="Tìm kiếm" sx={{ flex:1, marginRight:'1rem' }}/>
          <Button variant='contained' size='small'>Tìm kiếm</Button>
        </Stack>
        <Button variant="contained" size="small" onClick={handleCreateNew}>
          <Add fontSize="small"/>
                    Thêm Mới
        </Button>
      </Box>
      <CustomTable data={catalogs} columns={columns}/>
      <CreateNew open={openCreateNew} onClose={() => setOpenCreateNew(false)}/>
    </Box>
  )
}
const CreateNew = ({ open, onClose }) =>
{
  const dispatch = useDispatch()
  const alert = useAlert()
  const [isValidateName, setValidateName] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { catalog } = useSelector(state => state.adminProductCatalog)
  const handleSubmit = async () =>
  {
    if (!catalog.name)
    {
      setValidateName(true)
      setErrorMessage('Vui lòng nhập tên danh mục')
    }
    else 
    {
      dispatch(setLoading(true))
      try 
      {
        setErrorMessage('')
        var res 
        if (catalog._id)
        {
          res = await fetchUpdateProductCatalogAPI(catalog)
        }
        else 
        {
          
          res = await fetchCreateProductCatalogAPI(catalog)
        }
        dispatch(setCatalog({}))
        alert('success', res.data.msg)
        dispatch(fetchProductCatalogs())
        dispatch(setLoading(false))
        onClose()
        
      }
      catch (error)
      {
        dispatch(setLoading(false))
        if (error.response && error.response.data && error.response.data.msg) {
          alert('error', error.response.data.msg)
        } else {
          alert('error', 'Có lỗi xảy ra, vui lòng thử lại')
        }
      }
    }
  }
  const handleChange = (e) =>
  {
    setValidateName(false)
    setErrorMessage('')
    dispatch(setCatalog({ ...catalog, [e.target.name]:e.target.value }))
  }
  const handleCancel = () =>
  {
    setErrorMessage('')
    setValidateName(false)
    onClose()
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth={true}
    >
      <DialogTitle>Tạo Mới Danh Mục</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          name="name"
          label="Nhập tên danh mục"
          type="text"
          fullWidth
          variant="standard"
          value={catalog.name}
          error={isValidateName}
          helperText={isValidateName ? errorMessage : ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined">Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {
            catalog._id ? 'Cập nhập' : 'Tạo'
          }
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ProductCatalog