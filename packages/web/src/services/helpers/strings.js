
export const titleize = (inputString) => {
  // TODO EXTREMELY POOR IMPL. PLEASE USE LIBRARY
  return inputString.split(/(\s|-)/g).filter(e => (e !== '-' && e !== ' '  && e !== '')).map((elem) => { return `${elem[0].toUpperCase()}${elem.substring(1)}`; }).join(' ');
};

export const commaAnd = (list) => {
  if (list.length > 1) {
    return `${list.slice(0, -1)} and ${list[list.length - 1]}`;
  } else if (list.length === 1) {
    return list[0];
  }
  return null;
};
