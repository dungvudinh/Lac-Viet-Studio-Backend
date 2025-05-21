import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import { Box, Stack, Button, TextField, Typography, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, Grid2 as Grid, IconButton } from '@mui/material'
import { Add, ModeEditOutline, DeleteOutline, ArrowBack, ArrowForward, Bookmark } from '@mui/icons-material'
// import Navigation from "~/admin/components/Navigation";
import CustomTable from '~/components/CustomTable'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '~/redux/features/slices/loadingSlice'
import confirmAlert from '~/utils/confirmAlert'
import { fetchProducts } from '~/redux/features/thunks/productThunk'
import { resetProductState, setProduct, resetProduct } from '~/redux/features/slices/productSlice'
import { useAlert } from '~/utils/alert'
import { fetchCreateProductAPI, fetchDeleteProductAPI, fetchUpdateProductAPI } from '~/apis/productAPI'
import ImageStack from '~/components/ImageStack'
import imageCompression from 'browser-image-compression'
import Backdrop from '~/components/Backdrop'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow } from 'swiper/modules'
import { setBackdrop } from '~/redux/features/slices/backdropSlice'
import {formatCurrency, removeCurrencyFormat} from '~/utils/formatCurrency'

const cx = classNames.bind(styles)
function Product()
{
  const dispatch = useDispatch()
  const { catalogSlug } = useParams()
  const alert = useAlert()
  const { products } = useSelector(state => state.adminProduct)
  const [openCreateNew, setOpenCreateNew] = useState(false)
  const [imagesPerProduct, setImagesPerProduct] = useState([])    
    
  useEffect(() =>
  {
    dispatch(setLoading(true))
    dispatch(fetchProducts(catalogSlug))
    dispatch(setLoading(false))
    return () => dispatch(resetProductState()) // clear data when unmounting
  }, [])
  const handleDelete = async (_id) =>
  {
    const isConfirmed = await confirmAlert()
    if (isConfirmed)
    {
      dispatch(setLoading(true))
      try 
      {
        const res = await fetchDeleteProductAPI(catalogSlug, _id)          
        alert('success', res.data.msg)
        dispatch(fetchProducts(catalogSlug))
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
    dispatch(setProduct(data))
    setOpenCreateNew(true)
  }
  const handleCreateNew = async () =>
  {
    setOpenCreateNew(true)
    dispatch(resetProduct())
  }
  const handleOpenSetPrimaryImg = (images) =>
  {
    dispatch(setBackdrop(true))
    setImagesPerProduct(images)

  }
  const columns = [
    {
      accessorKey: 'name',
      header: 'Tên Sản Phẩm',
      cell: info => info.getValue()
    },
    {
      accessorKey: 'images',
      header: 'Hình Ảnh',
      classNames:'d-flex justify-content-center',
      cell: info => <ImageStack images={info.getValue()} onOpenSetPrimaryImg={handleOpenSetPrimaryImg}/>
    },
    {
      accessorKey: 'listedPrice',
      header: 'Giá Niêm Yết',
      cell: info => `${formatCurrency(info.getValue())}đ`
    },
    {
      accessorKey: 'sellingPrice',
      header: 'Giá Bán',
      cell: info => `${formatCurrency(info.getValue())}đ`
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
          </ButtonGroup>
              
        </div>
      )
    }
  ]
  return (
    <Box>
      {/* <Navigation /> */}
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
      <CustomTable data={products} columns={columns}/>
            
      <CreateNew open={openCreateNew} onClose={() => setOpenCreateNew(false)}/>
      <Backdrop>
        <div style={{ position: 'relative', width: '100%', textAlign:'center' }}>
          <button className="swiper-button-prev" style={{ color:'var(--primary-color)' }} onClick={e => e.stopPropagation()}></button>
          <button className="swiper-button-next" style={{ color:'var(--primary-color)' }} onClick={e => e.stopPropagation()}></button>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 20,
              modifier: 1
            }}
            modules={[EffectCoverflow, Navigation]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next'
            }}
            slidesPerView={3}
            spaceBetween={30}
            initialSlide={0}
          >
            {imagesPerProduct.length > 0 && imagesPerProduct.map((image, index) => (
              <SwiperSlide onClick={(event) => event.stopPropagation()} key={index} style={{ height:'300px' }}>
                {products.length > 0 && (
                  <img src={image.url} style={{ width:'100%', height:'100%', objectFit:'contains' }}/>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <Button variant="contained" sx={{ marginTop:'1rem' }} onClick={e => e.stopPropagation()}>
                Đặt làm hình đại diện sản phẩm
          </Button>
        </div>
      </Backdrop>
    </Box>
  )
}
const CreateNew = ({ open, onClose }) =>
{
  const dispatch = useDispatch()
  const alert = useAlert()
  const { catalogSlug } = useParams()
  const { product } = useSelector(state => state.adminProduct)
  const [imageSlots, setImageSlots] = useState([])
  const [errorMessages, setErrorMessages] = useState({})
  useEffect(() => {
    if (product && product.images)
    {
      const existingImages = product.images.map((image, index) => ({
        id: index +1, 
        publicId: image.publicId,
        image: null, 
        preview: image.url, 
        isRepresentative: image.isRepresentative
      }))
      setImageSlots([...existingImages, { id:existingImages.length + 1, publicId: null, image: null, preview: null }])
    }
    else 
      setImageSlots([{ id:1, publicId: null, image: null, preview: null }])
    return () => {
      imageSlots.forEach(slot => {
        if (slot.preview) {
          URL.revokeObjectURL(slot.preview)
        }
      })
    }
  }, [open])
  
  const handleInputChange = (e) => {
    let { name, value } = e.target
    setErrorMessages({ ...errorMessages, [name]:'' })
    if(name === 'sellingPrice' || name === 'listedPrice')
      value = removeCurrencyFormat(value)
    dispatch(setProduct({ ...product, [name]:value }))
  }

  const handleSlotImageChange = async (slotId, file) => {
    if (file) {
      try 
      {
        dispatch(setLoading(true))
        const options = {
          maxSizeMB: 1, // Max file size
          maxWidthOrHeight: 1920, // Max dimension
          useWebWorker: true // For non-blocking compression
        }
        const compressedFile = await imageCompression(file, options)
        const preview = URL.createObjectURL(compressedFile)
        const updatedSlots = imageSlots.map(slot => 
          slot.id === slotId 
            ? { ...slot, image: compressedFile, preview } 
            : slot
        )
        if (updatedSlots.length > 0)
          setErrorMessages({ ...errorMessages, images:'' })
        
        setImageSlots([...updatedSlots, { id:imageSlots[imageSlots.length - 1].id + 1, publicId: null, image: null, preview: null }])
        console.log([...updatedSlots, { id:imageSlots[imageSlots.length - 1].id + 1, publicId: null, image: null, preview: null }])
        dispatch(setLoading(false))

      }
      catch (error)
      {
        console.log('Compression error:', error)
      }
    }
  }
  const handleRemoveSlotImage = (slotId) => {
    const updatedSlots = imageSlots.filter(slot => {
      if (slot.id === slotId) 
        URL.revokeObjectURL(slot.preview)
      return slot.id !==slotId
    })
    if (updatedSlots.length < 2)
      setErrorMessages({ ...errorMessages, image:'Vui lòng thêm hình ảnh' })
    else
      setImageSlots(updatedSlots)
  }
  const validateData = (object, fieldName = null) => {
    let errors = {}
  
    // Kiểm tra tất cả các trường nếu không chỉ định fieldName
    const fieldsToCheck = fieldName ? [fieldName] : ['name', 'listedPrice', 'sellingPrice', 'age']
  
    fieldsToCheck.forEach((field) => {
      const value = object[field]
      if (!value || (Array.isArray(value) && value.length === 0)) {
        switch (field) {
        case 'name':
          errors.name = 'Vui lòng nhập tên sản phẩm'
          break
        case 'listedPrice':
          errors.listedPrice = 'Vui lòng nhập giá niêm yết'
          break
        case 'sellingPrice':
          errors.sellingPrice = 'Vui lòng nhập giá bán'
          break
        case 'age':
          errors.age = 'Vui lòng nhập độ tuổi'
          break
        default:
          errors[field] = 'Trường này không được để trống'
        }
      }
    })
  
    return errors
  }
  const handleBlur = (e) => {
    const fieldName = e.target.name
    const value = e.target.value
    const errors = validateData({ [fieldName]: value }, fieldName)
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      ...errors
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    var errors = validateData(product)
    if (imageSlots.length < 2)
      errors.images = 'Vui lòng thêm hình ảnh'
    // else if(!imageSlots.some(slot=>slot.isRepresentative === true))
    //   errors.images = 'Vui lòng đặt ảnh đại diện cho sản phẩm'

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors)
      return
    }
    setErrorMessages({})
    try 
    {
      dispatch(setLoading(true))
      var response
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('listedPrice', product.listedPrice)
      formData.append('sellingPrice', product.sellingPrice)
      formData.append('age', product.age)
      if (product._id)
      {
        //update 
        //filter in product images stored in database was removed by user action
        const images = []
        const imageDeletedIds = []
        imageSlots.forEach(imageSlot =>
        {
          if (imageSlot.image instanceof Blob)
            images.push(imageSlot.image)
        })
        product.images.forEach(productImage => {
          const isExist = imageSlots.some(imageSlot => imageSlot.publicId === productImage.publicId)
          if (!isExist) {
            // Image exists in product.images but not in imageSlots, hence deleted
            imageDeletedIds.push({ publicId: productImage.publicId })
          }
        })
        images.forEach(image => {
          formData.append('images', image)
        })
        formData.append('imageDeletedIds', JSON.stringify(imageDeletedIds))
        response = await fetchUpdateProductAPI(catalogSlug, product._id, formData)
      }
      else 
      {
        imageSlots.forEach(imageSlot => {
          formData.append('images', imageSlot.image)
        })
        response = await fetchCreateProductAPI(catalogSlug, formData)
      }
      alert('success', response.data.msg)
      dispatch(fetchProducts(catalogSlug))
      dispatch(setLoading(false))
      onClose()
      setImageSlots([{ id:1, publicId: null, image:null, preview:null }])
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
  const handleSetAvatar = (id)=>
  {
    setImageSlots(prev=> prev.map(slot=> slot.isRepresentative ? {...slot, isRepresentative:false} : slot).map(slot=> slot.id === id ? {...slot, isRepresentative: true} : slot))
  }
  const handleCancel = () =>
  {
    onClose()
  }
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{product._id ? 'Cập nhập sản phẩm' : 'Tạo mới sản phẩm'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Product Details Section */}
          <div className={cx('form-section')}>
            <Typography variant="subtitle1" gutterBottom>Thông tin sản phẩm</Typography>
            <Grid container spacing={2} direction={'column'}>
              <Grid >
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errorMessages.name && errorMessages.name !== ''}
                  helperText={errorMessages.name}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Giá niêm yết"
                  name="listedPrice"
                  type="text"
                  value={formatCurrency(product.listedPrice)}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errorMessages.listedPrice && errorMessages.listedPrice !== ''}
                  helperText={errorMessages.listedPrice}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Giá bán"
                  name="sellingPrice"
                  type="text"
                  value={formatCurrency(product.sellingPrice)}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errorMessages.sellingPrice && errorMessages.sellingPrice !== ''}
                  helperText={errorMessages.sellingPrice}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Độ tuổi"
                  type="number"
                  name="age"
                  value={product.age}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={!!errorMessages.age && errorMessages.age !== ''}
                  helperText={errorMessages.age}
                />
              </Grid>
            </Grid>
          </div>

          {/* Image Slots Section */}
          <div className={cx('form-section', { error: errorMessages.images && errorMessages.images !== '' })}>
            <Typography variant="subtitle1" gutterBottom>Hình ảnh sản phẩm</Typography>
            <Grid container spacing={2} display={'flex'} flexDirection={'row'}>
              {imageSlots.map((slot, index) => (
                <Grid size={4} key={slot.id}>
                  <Box 
                    className={cx('image-slot', { isRepresentative: slot.isRepresentative })}
                    sx={{ 
                      position: 'relative',
                      aspectRatio: '1',
                      border: `2px dashed #CCC`,
                      borderRadius: '4px',
                      overflow: 'hidden', 
                      width:'100%',
                      height:'100%'
                    }}
                  >
                    {slot.preview ? (
                      <>
                        <img 
                          src={slot.preview} 
                          alt={`Slot ${slot.id}`}
                          style={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                            
                          }}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveSlotImage(slot.id)}
                          sx={{
                            position: 'absolute',
                            zIndex:'10',
                            top: 4,
                            right: 4,
                            minWidth: 'auto',
                            padding: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              backgroundColor: '#ffebee'
                            }
                          }}
                          onBlur={() => {}}
                        >
                          <DeleteOutline fontSize="small" sx={{ width:'1rem', height:'1rem' }}/>
                        </IconButton>
                        {slot.isRepresentative && <Bookmark  sx={{position:'absolute', left:0, top:0,color:'#FFCB34'}} />}
                        {!slot.isRepresentative && 
                        <div className={cx('slot-overlay')}>
                          <Button variant='contained' size='small' onClick={()=>handleSetAvatar(slot.id)}>Đặt avatar</Button>
                        </div>
                        }
                      </>
                    ) : (
                      <Button
                        component="label"
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <Add fontSize="large" sx={{ color:errorMessages.images && errorMessages.images !== '' ? 'red' : '' }}/>
                        <Typography variant="caption" color={errorMessages.images && errorMessages.images !=='' ? 'red' : ''}>Thêm ảnh</Typography>
                        <input
                          type="file"
                          accept="image/*"
                          name="images"
                          onChange={(e) => handleSlotImageChange(slot.id, e.target.files[0])}
                          hidden
                        />
                      </Button>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
            {errorMessages.images && errorMessages.images !== '' && (
              <Typography color={'red'} fontSize={'var(--fs-sm)'} sx={{ margin:'3px 14px 0' }}>{errorMessages.images}</Typography>
            )}
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined">Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  )
}
export default Product