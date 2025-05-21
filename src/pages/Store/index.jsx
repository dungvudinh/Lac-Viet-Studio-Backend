import { useEffect, useState } from 'react'
import { Box, Button, Stack, Typography, Select, MenuItem, 
  TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Grid2 as Grid, 
  IconButton, 
  ButtonGroup } from '@mui/material'
import { Add, ArrowForwardOutlined, BorderColor, Delete, DeleteOutline, ModeEditOutline, MoreHoriz } from '@mui/icons-material'
import styles from './Store.module.scss'
import classNames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import { setLoading } from '~/redux/features/slices/loadingSlice'
import Loading from '~/components/Loading'
import CustomTable from '~/components/CustomTable'

const cx = classNames.bind(styles)
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
          <Button size='small' sx={{ backgroundColor:'#1976d2' }} >
            <ModeEditOutline fontSize='small'/>
          </Button>
          <Button size='small' sx={{ backgroundColor:'#d32f2f' }}>
            <DeleteOutline fontSize='small'/>
          </Button>
          <Button size='small' sx={{ backgroundColor:'#42a5f5' }}>
            <MoreHoriz fontSize='small'/>
          </Button>
        </ButtonGroup>
        
      </div>
    )
  }
]

function Store() {
  const [age, setAge] = useState('')
  const [listProduct, setListProduct] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [error, setError] = useState('') 
  const dispatch = useDispatch()
  useEffect(() =>
  {
    dispatch(setLoading(true))
    // fetchGetAllProductAPI()
    //   .then(res => {
    //     console.log(res)
    //     setListProduct(res.data)
    //     dispatch(setLoading(false))
    //   })
    //   .catch(error => {
    //     //handle error
    //     setError(error)
    //     dispatch(setLoading(false))
    //   })
  }, [])
  const handleChange = (event) => {
    setAge(event.target.value)
  }
  return (
    <Box>
      {/* NAVIGATION */}
      <Box sx={{ margin:'1rem 0' }}>
        <Stack direction={'row'} alignItems={'center'} sx={{ marginBottom:'1rem' }}>
          <Typography variant="h6" sx={{ fontSize:'var(--fs-lg)', marginRight:'1rem' }} color='primary'>Trang Chủ</Typography>
          <Typography variant='h6' sx={{ fontSize:'var(--fs-lg)', display:'flex', alignItems:'center' }}>
            <ArrowForwardOutlined fontSize='small' sx={{ width:'1.1rem', height:'1.1rem', marginRight:'1rem' }}/>
              Thống Kê Bán Hàng
          </Typography>
        </Stack>
        <Typography variant='h1' fontSize='var(--fs-lg)' fontWeight={600}>Thống Kê Chung</Typography>
      </Box>
      {/* CONTAINER */}
      {/* HEADER */}
      <Box sx={{ padding:'1rem', backgroundColor:'var(--text-white)', borderRadius:'0.5rem',
        display:'flex', justifyContent:'space-between', alignItems:'center', direction:'row' }}>
        <Stack sx={{ width:'17rem' }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Button variant="contained" size="small" onClick={() => setOpenPopup(true)}>
            <Add fontSize="small"/>
            Thêm Mới
          </Button>

          <Select
            value={age}
            onChange={handleChange}
            sx={{ minWidth:'9rem', '& .MuiSelect-select':{ padding:'6px' } }} 
            displayEmpty
          >
            <MenuItem value="">
            Sắp xếp theo  
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Stack>

        <Stack direction={'row'} sx={{ minWidth:'20rem' }} justifyContent={'space-between'} alignItems={'center'}>
          <TextField variant='standard' label="Tìm kiếm" sx={{ flex:1, marginRight:'1rem' }}/>
          <Button variant='contained' size='small'>Tìm kiếm</Button>
        </Stack>
      </Box>
      {/* CONTENT */}
      <Box sx={{ backgroundColor:'var(--text-white)', borderRadius:'0.5rem', marginTop:'1rem' }}>
        {/* <ProductList listProduct={listProduct}/> */}
        <CustomTable data={listProduct} columns={columns}/>
      </Box>
      
      {/* Add Product Popup */}
      {openPopup && <AddProductPopup onClose={() => setOpenPopup(false)} />}
      <Loading />
    </Box>
  )
}

// const ProductList = ({ listProduct }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Sản Phẩm</TableCell>
            
//             <TableCell align="center">Hình Ảnh</TableCell>
//             <TableCell align="center">Giá Niêm Yết</TableCell>
//             <TableCell align="center">Giá bán</TableCell>
//             <TableCell align="center">Độ Tuổi</TableCell>
//             <TableCell align="center">Trạng Thái</TableCell>
//             <TableCell align="center">Hành Động</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {listProduct.length > 0 && listProduct.map((product) => (
//             <TableRow
//               key={product._id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {product.name}
//               </TableCell>
//               <TableCell align="center">
//                 <img src={product.image} style={{ width:'100px' }}/>
//               </TableCell>
//               <TableCell align="center">{product.listedPrice}</TableCell>
//               <TableCell align="center">{product.sellingPrice}</TableCell>
//               <TableCell align="center">{product.age}</TableCell>
//               <TableCell align="center">Đang niêm yết</TableCell>
//               <TableCell align="center" sx={{ width:'8rem' }}>
//                 <IconButton size='small' sx={{ mr:'0.5rem' }}>
//                   <BorderColor fontSize='small'/>
//                 </IconButton>
//                 <IconButton size='small'>
//                   <Delete fontSize='small'/>
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// }

const AddProductPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    listedPrice: '',
    sellingPrice: '',
    age: ''
  })
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try 
    {
      // await fetchCreateProductAPI(formData)
      // await fetchGetAllProductAPI()
      // onClose()
    }
    catch (error)
    {
    }
    // Add your API call here to save the product

  }

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Thêm Sản Phẩm Mới</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Product Image Section */}
          <div className={cx('form-section')}>
            <Typography variant="subtitle1" gutterBottom>Hình ảnh sản phẩm</Typography>
            <div className={cx('image-preview')}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <Typography color="textSecondary">Chọn ảnh</Typography>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={cx('file-input')}
                name='image'
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className={cx('form-section')}>
            <Typography variant="subtitle1" gutterBottom>Thông tin sản phẩm</Typography>
            <Grid container spacing={2} direction={'column'}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Giá niêm yết"
                  name="listedPrice"
                  type="number"
                  value={formData.listedPrice}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Giá bán"
                  name="sellingPrice"
                  type="number"
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Độ tuổi"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '1rem 1.5rem' }}>
        <Button variant="outlined" onClick={onClose} sx={{ color:'#111' }}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Store