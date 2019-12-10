export const formatMoney = (amount, decimalCount = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalCount,
  });

  const number = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.]/g, '')) : amount;
  return formatter.format(number);
};
