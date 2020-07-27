import { palette as themePalette } from 'sly/common/components/themes';

const safeColorValues = ['transparent', 'currentcolor'];

export const getColor = (palette, variation, defaults) => (props) => {
  if (safeColorValues.includes(props[palette])) {
    return props[palette];
  }
  const args = (props[palette] || defaults).split('.');
  if (args.length === 1) {
    args.push(props[variation] || 'base');
  }
  return themePalette(...args);
};
