import { assetsUrl } from 'sly/web/config';

export const getFormat = ({ width, height, aspectRatio, crop = true }) => {
  if (!(width || height)) {
    throw new Error('Image Handler needs at least one dimension');
  }

  if (!height && aspectRatio) {
    height = Math.ceil(width * aspectRatio);
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

const getSrcsetForPath = (imagePath, { sources, aspectRatio }) => sources.map((source) => {
  let width;
  let height;
  if (Array.isArray(source)) {
    [width, height] = source;
  } else {
    width = source;
  }

  const format = { width, height, aspectRatio };
  return `${getImagePath(imagePath, format)} ${width}w`;
}).join(', ');

// only doing 3:2 for now
export const getSrcset = (imagePath, config) => ({
  src: getImagePath(imagePath.replace(/\.jpe?g$/i, '.jpg'), { width: 768, aspectRatio: config.aspectRatio }),
  jpegSrcset: getSrcsetForPath(imagePath.replace(/(\.jpe?g|\.webp)$/i, '.jpg'), config),
  webpSrcset: getSrcsetForPath(imagePath.replace(/\.jpe?g$/i, '.webp'), config),
});

