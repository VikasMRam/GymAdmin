import { assetsUrl } from 'sly/config';

export const getFormat = ({ width, height, crop = true }) => {
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

const getSrcsetForPath = (imagePath, sources) => sources.map((source) => {
  let width;
  let height;
  if (Array.isArray(source)) {
    [width, height] = source;
  } else {
    width = source;
  }

  const format = { width, height };
  return `${getImagePath(imagePath, format)} ${width}w`;
}).join(', ');

// only doing 3:2 for now
export const getSrcset = (imagePath, config) => ({
  src: getImagePath(imagePath, { width: 768 }),
  jpegSrcset: getSrcsetForPath(imagePath, config.sources),
  webpSrcset: getSrcsetForPath(imagePath.replace(/\.jpe?g/, '.webp'), config.sources),
});

