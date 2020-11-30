import { css } from 'styled-components';

import { size } from 'sly/common/components/themes';

const makeStyles = (styles) => {
  if (Array.isArray(styles) || typeof styles === 'string' || !styles) {
    return styles;
  }
  return css(styles);
};

export const upTo = (device, styles) => css`
  @media screen and (max-width: calc(${size('breakpoint', device)} - 1px)) {
    ${makeStyles(styles)}
  }
`;

export const startingWith = (device, styles) => device ? css`
  @media screen and (min-width: ${size('breakpoint', device)}) {
    ${makeStyles(styles)}
  }
` : makeStyles(styles);
