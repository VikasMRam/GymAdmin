export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const locale = 'en-us';
  const month = date.toLocaleString(locale, { month: 'short' });
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  if (day.length < 2) day = `0${day}`;
  return `${month} ${day}, ${year}`;
};

// value in yyyy-mm-dd format
export const dateFormatter = (value) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 4) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}`;
  }
  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}-${onlyNums.slice(6, 8)}`;
};
