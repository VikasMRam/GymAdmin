import { palette as themePalette } from 'sly/common/components/themes';

export const getColor = (palette, variation, defaults) => (props) => {
  const args = (props[palette] || defaults).split('.');
  if (args.length === 1) {
    args.push(props[variation] || 'base');
  }
  return themePalette(...args);
};
