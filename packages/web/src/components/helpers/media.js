import { css } from 'styled-components';

import { size } from 'sly/web/components/themes';

export const upTo = device => css`
  @media screen and (max-width: calc(${size('breakpoint', device)} - 1px))
`;

export const startingFrom = device => css`
  @media screen and (min-width: ${size('breakpoint.tablet')})
`;
