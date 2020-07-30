import { css } from 'styled-components';

import { publicPath } from 'sly/web/config';

export const columnWidth = (parts, gutter) => css`
  // WARNING: no semicolon here, keep it that way
  calc((100% + ${gutter}) / ${parts} - ${gutter})
`;

export const gridColumns = (parts, gutter) => css`
  display: grid;
  grid-gap: ${gutter};
  grid-template-columns: repeat(auto-fit, ${columnWidth(parts, gutter)});
`;

export const assetPath = url => `${publicPath}/${url}`;
