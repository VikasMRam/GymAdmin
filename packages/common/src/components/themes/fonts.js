export const fonts = {
  heading: 'Tiempos Headline, Georgia, serif',
  primary: 'Azo Sans, Roboto, sans-serif',
};

const fontText = (size, weight, font) => `${weight} ${size} ${font}`;
export const makeFont = (sizes, weight = 400, font = fonts.primary) => {
  if (Array.isArray(sizes)) {
    return sizes.map(size => size && fontText(size, weight, font));
  }
  return fontText(sizes, weight, font);
};
