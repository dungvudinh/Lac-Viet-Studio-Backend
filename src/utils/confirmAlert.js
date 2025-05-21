import Swal from 'sweetalert2'

// Popup xác nhận (dùng cho xóa, cập nhật...)
const confirmAlert = async ({
  title = 'Bạn có chắc chắn muốn xóa?',
  text = 'Hành động này không thể hoàn tác!',
  confirmButtonText = 'Xác nhận',
  cancelButtonText = 'Hủy',
  icon = 'warning'
} = {}) =>
{
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText
  })
  return result.isConfirmed
}
export default confirmAlert