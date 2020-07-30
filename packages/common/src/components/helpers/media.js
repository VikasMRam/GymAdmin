import { css } from 'styled-components';

import { size } from 'sly/common/components/themes';

export const upTo = device => css`
  @media screen and (max-width: calc(${size('breakpoint', device)} - 1px))
`;

export const startingWith = device => css`
  @media screen and (min-width: ${size('breakpoint', device)})
`;
