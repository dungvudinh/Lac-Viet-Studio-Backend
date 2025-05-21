const formatCurrency = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('vi-VN').format(value); // Không dùng style: 'currency'
};

const removeCurrencyFormat = (formattedValue) => {
    if (!formattedValue) return 0;
    const numeric = formattedValue.replace(/[^\d]/g, ''); // Xóa mọi ký tự không phải số
    return Number(numeric);
  };
  
export {removeCurrencyFormat, formatCurrency}
