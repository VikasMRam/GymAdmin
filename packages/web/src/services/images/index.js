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

const getSrcsetForPath = (imagePath, { sources, aspectRatio, crop }) => sources.map((source) => {
  let width;
  let height;
  if (Array.isArray(source)) {
    [width, height] = source;
  } else {
    width = source;
  }

  const format = { width, height, aspectRatio, crop };
  return `${getImagePath(imagePath, format)} ${width}w`;
}).join(', ');

export const getSrcset = (imagePath, config) => ({
  src: getImagePath(
    imagePath,
    { width: 768, aspectRatio: config.aspectRatio, crop: config.crop },
  ),
  srcSet: getSrcsetForPath(imagePath, config),
});

