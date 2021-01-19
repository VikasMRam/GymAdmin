export const phoneParser = (str='') => {
  return str.toString().replace(/[^\d]/g, '');
}
export const phoneFormatter = (value, parens = false, ...args) => {
  if (!value) {
    return value;
  }

  if (typeof value === 'number') {
    value = value.toString(10);
  }

  let onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length === 11 && onlyNums[0] === '1') {
    onlyNums = onlyNums.slice(1);
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return `${parens ? '(' : ''}${onlyNums.slice(0, 3)}${parens ? ') ' : '-'}${onlyNums.slice(3)}`;
  }
  return onlyNums.length === 11 ?  `${parens ? '(' : ''}${onlyNums.slice(0, 4)}${parens ? ') ' : '-'}${onlyNums.slice(4)}` :`${parens ? '(' : ''}${onlyNums.slice(0, 3)}${parens ? ') ' : '-'}${onlyNums.slice(3, 6)}-${onlyNums.slice(6)}`;
};

export const areaCode = (str='') => {
  return phoneParser(str).slice(0,3);
};
