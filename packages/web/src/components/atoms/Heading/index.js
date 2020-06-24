import React from 'react';
import { node, number, oneOf, string } from 'prop-types';
import styled, { css } from 'styled-components';

import { text as textPropType } from 'sly/web/propTypes/text';
import { weight as weightPropType } from 'sly/web/propTypes/weight';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { size, palette } from 'sly/web/components/themes';

const fontSize = p => size('text', p.size || p.level);
const lineHeight = p => size('lineHeight', p.size || p.level);
const fontWeight = p => size('weight', p.weight);
const color = p => palette(p.palette, p.variation);

const getMarginBottom = (p) => {
  switch (p.size) {
    case 'hero': return '2.000rem';
    case 'title': return '1.500rem';
    case 'subtitle': return '1.000rem';
    default: return '1.000rem';
  }
};

const H1 = styled('h1')``;
const H2 = styled('h2')``;
const H3 = styled('h3')``;

const getTag = (level) => {
  switch (level) {
    case 'hero': return H1;
    case 'title': return H2;
    case 'subtitle': return H3;
    default: return H1;
  }
};

const Heading = styled((props) => {
  const HeadingTag = getTag(props.level);
  return (
    <HeadingTag
      {...props}
    />
  );
})`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  font-weight: ${fontWeight};
  margin: 0 0 ${getMarginBottom} 0;
  color: ${color};
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
