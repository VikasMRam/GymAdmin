export const phoneParser = str => str.replace(/[^\d]/g, '');
export const phoneFormatter = (value, parens = false, ...args) => {
  if (!value) {
    return value;
  }

  if (typeof value === 'number') {
    value = value.toString(10);
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return `${parens ? '(' : ''}${onlyNums.slice(0, 3)}${parens ? ') ' : '-'}${onlyNums.slice(3)}`;
  }
  return `${parens ? '(' : ''}${onlyNums.slice(0, 3)}${parens ? ') ' : '-'}${onlyNums.slice(3, 6)}-${onlyNums.slice(6)}`;
};

