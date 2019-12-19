import React from 'react';
import { node, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';

import { text as textPropType } from 'sly/propTypes/text';
import { weight as weightPropType } from 'sly/propTypes/weight';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { size, palette } from 'sly/components/themes';

const fontSize = p => size('text', p.size || p.level);
const lineHeight = p => size('lineHeight', p.size || p.level);
const fontWeight = p => size('weight', p.weight);
const color = p => palette(p.palette, p.variation);

const getTag = (level) => {
  switch (level) {
    case 'hero': return 1;
    case 'title': return 2;
    case 'subtitle': return 3;
    default: return 1;
  }
};

const styles = css`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  font-weight: ${fontWeight};
  // TODO: review this with @jared,
  // for now let's make margin-bottom relative to font-size
  margin: 0 0 calc(${fontSize} * 0.25) 0;
  color: ${color};
`;

const Heading = styled(({
  level, children, palette, variation, theme, _ref, ...props
}) =>
  React.createElement(`h${getTag(level)}`, { ref: _ref, ...props }, children))`
  ${styles};
`;

Heading.propTypes = {
  level: oneOf(['hero', 'title', 'subtitle']).isRequired,
  size: textPropType,
  weight: weightPropType,
  children: node,
  palette: palettePropType,
  variation: variationPropType,
};

Heading.defaultProps = {
  level: 'title',
  palette: 'slate',
  variation: 'base',
  weight: 'medium',
};

export default Heading;
