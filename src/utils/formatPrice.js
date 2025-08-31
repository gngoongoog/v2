// src/utils/formatPrice.js
export const formatPrice = (price) => {
  if (price === null || price === undefined) return '';
  
  return new Intl.NumberFormat('ar-IQ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price) + ' د.ع';
};