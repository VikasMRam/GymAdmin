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
