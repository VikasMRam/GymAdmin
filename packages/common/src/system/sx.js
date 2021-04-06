import _space from './_props/space';
import _layout from './_props/layout';
import _element from './_props/element';
import _grid from './_props/grid';
import _snap from './_props/snap';
import _text from './_props/text';
import _border from './_props/border';
import _color from './_props/color';
import { template, makeMediaQueries } from './util';
import { compose, get } from './system';

export { template };

export const withSystem = compose(
  _space,
  _layout,
  _element,
  _grid,
  _snap,
  _text,
  _border,
  _color,
);

const cache = {};

export const sx = (styles, ...keys) => {
  if (Array.isArray(styles)) {
    return template(styles, ...keys);
  }
  return props => withSystem({
    theme: props.theme,
    ...styles,
  });
};

export const sx$tablet = (styles, ...keys) => {
  if (Array.isArray(styles)) {
    const tmpl = template(styles, ...keys);
    return (props) => {
      // eslint-disable-next-line no-multi-assign
      const media = (cache.media = (cache.media || makeMediaQueries(props.theme.breakpoint)));
      return `
        ${media.queries[1]} {
          ${tmpl(props)}
        }
      `;
    };
  }
  return props => withSystem({
    theme: props.theme,
    sx$tablet: styles,
  });
};

export const sx$laptop = (styles, ...keys) => {
  if (Array.isArray(styles)) {
    const tmpl = template(styles, ...keys);
    return (props) => {
      // eslint-disable-next-line no-multi-assign
      const media = (cache.media = (cache.media || makeMediaQueries(props.theme.breakpoint)));
      return `
        ${media.queries[2]} {
          ${tmpl(props)}
        }
      `;
    };
  }
  return props => withSystem({
    theme: props.theme,
    sx$laptop: styles,
  });
};

export const space = key => ({ theme }) => get(theme.space, key, key);
export const layout = key => ({ theme }) => get(theme.layout, key, key);
export const element = key => ({ theme }) => get(theme.element, key, key);
export const font = key => ({ theme }) => get(theme.fonts, key, key);
export const border = key => ({ theme }) => get(theme.border, key, key);
export const color = key => ({ theme }) => get(theme.color, key, key);

