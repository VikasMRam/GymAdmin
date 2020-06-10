import { palette as themePalette } from 'sly/web/components/themes';

export const getColor = (palette, variation) => (props) => {
  const args = props[palette].split('.');
  if (args.length === 1) {
    args.push(props[variation] || 'base');
  }
  return themePalette(...args);
};
