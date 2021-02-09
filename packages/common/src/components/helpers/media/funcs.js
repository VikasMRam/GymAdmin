import { css } from 'styled-components';

import { size } from 'sly/common/components/themes';

const responsiveStyles = [
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginX',
  'marginY',
  'm',
  'mt',
  'mb',
  'ml',
  'mr',
  'pad',
  'mx',
  'my',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingX',
  'paddingY',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
];

const makeStyles = (styles) => {
  if (Array.isArray(styles) || typeof styles === 'string' || !styles) {
    return styles;
  }
  const entries = { ...styles };
  responsiveStyles.forEach((style) => {
    if (entries[style]) {
      delete entries[style];
    }
  });
  return css(entries);
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
