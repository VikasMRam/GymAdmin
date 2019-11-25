import { assetsUrl } from 'sly/config';

export const getFormat = ({ width, height, crop = false }) => {
  if (!(width || height)) {
    throw new Error('Image Handler needs at least one dimension');
  }
  const cropString = !crop && width && height
    ? 'a'
    : '';

  return `${cropString}${width || ''}x${height || ''}`;
};

export const getImagePath = (path, format) => {
  if (format) {
    return `${assetsUrl}/images/${getFormat(format)}/${path}`;
  }

  // original
  return `${assetsUrl}/uploads/${path}`;
};


// only doing 3:2 for now
export const getSrcset = imagePath => [
  320,
  375,
  416, // our mobile
  768, // our tablet
  1080, // our tablet
  1200, // our max
].map((width) => {
  const format = { width, height: Math.round(width / 1.5) };
  return `${getImagePath(imagePath, format)} ${width}w`;
}).join(', ');

