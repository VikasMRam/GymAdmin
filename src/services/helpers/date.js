export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const locale = 'en-us';
  const month = date.toLocaleString(locale, { month: 'short' });
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  if (day.length < 2) day = `0${day}`;
  return `${month} ${day}, ${year}`;
};
