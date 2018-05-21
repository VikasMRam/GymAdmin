
export const titleize = (inputString) => {
  // TODO EXTREMELY POOR IMPL. PLEASE USE LIBRARY
  return inputString.split(/(\s|-)/g).filter(e => (e !== '-' && e !== ' ')).map((elem) => { return `${elem[0].toUpperCase()}${elem.substring(1)}`; }).join(' ');
};
