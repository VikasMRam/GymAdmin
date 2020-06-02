import styled, { css } from 'styled-components';

import { size } from 'sly/web/components/themes';

const spacing = (Component, { top = 'xLarge', bottom = 'xLarge', left = 'xLarge', right = 'xLarge' }) => styled(Component)`
  padding-top: ${size('spacing', top)};
  padding-bottom: ${size('spacing', bottom)};
  padding-left: ${size('spacing', left)};
  padding-right: ${size('spacing', right)};
`;

const getAutoValues = (ary, prefix) => {
  if (!Array.isArray(ary)) {
    ary = [ary];
  }
  if (ary.length === 1) {
    ary.push(ary[0]);
    ary.push(ary[0]);
    ary.push(ary[0]);
  }
  if (ary.length === 2) {
    ary.push(ary[0]);
    ary.push(ary[1]);
  }
  if (ary.length === 3) {
    ary.push(ary[1]);
  }
  if (ary.length !== 4) {
    throw new Error('something went wrong calculating padding or margins')
  }
  return [
    'Top',
    'Right',
    'Bottom',
    'Left',
  ].reduce((acc, prop, i) => {
    acc[`${prefix}${prop}`] = size('spacing', ary[i]);
    return acc;
  }, {});
};

const getValues = (props, prefix) => [
  'Top',
  'Right',
  'Bottom',
  'Left',
].reduce((acc, prop) => {
  const name = `${prefix}${prop}`;
  const value = props[name];
  if (value) {
    acc[name] = size('spacing', value);
  }
  return acc;
}, {});

export const withPadding = ({ padding, ...props } = {}) => {
  if (padding) {
    return css(getAutoValues(padding, 'padding'));
  }
  return css(getValues(props, 'padding'));
};

export const withMargin = ({ margin, ...props } = {}) => {
  if (margin) {
    return css(getAutoValues(margin, 'margin'));
  }
  return css(getValues(props, 'margin'));
};

export default spacing;
