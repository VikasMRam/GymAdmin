import dayjs from 'dayjs';

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

export const parseDate = (dateString) => {
  return dayjs(dateString);
};

export const durationInS = (startDayjs, endDayjs) => startDayjs.diff(endDayjs, 'second');

export const isAfter = (a, b) => dayjs(a).utc().isAfter(dayjs(b).utc());

export const isSameDay = (a, b) => dayjs(a).isSame(dayjs(b), 'day');
