export const formatMoney = (amount, decimalCount = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalCount,
  });
  return formatter.format(amount);
};
