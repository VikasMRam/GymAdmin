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

const getFormatFromWidth = width => ({ width, height: Math.round(width / 1.5) });

const getSrcsetForPath = imagePath => [
  320,
  375,
  416,  // our mobile
  768,  // our tablet
  1080, // our tablet
  1200, // our max
].map((width) => {
  const format = getFormatFromWidth(width);
  return `${getImagePath(imagePath, format)} ${width}w`;
}).join(', ');

// only doing 3:2 for now
export const getSrcset = imagePath => ({
  src: getImagePath(imagePath, getFormatFromWidth(768)),
  srcset: getSrcsetForPath(imagePath),
  webpSrcset: getSrcsetForPath(imagePath.replace(/\.jpe?g/, '.webp')),
});

