import React, { forwardRef } from 'react';
import { oneOfType, string, node } from 'prop-types';

import Block from 'sly/common/system/Block';

const levels = {
  'title-xxl': 'h1',
  'title-xl': 'h1',
  'title-l': 'h2',
  'title-m': 'h3',
  'title-s': 'h4',
  'title-s-azo': 'h4',
  'title-xs-azo': 'h5',
};

const fonts = {
  h1: 'title-xl',
  h2: 'title-l',
  h3: 'title-m',
  h4: 'title-s-azo',
  h5: 'title-xs-azo',
};

const Heading = forwardRef(({ as: asProp, font, ...props }, ref) => (
  <Block
    as={asProp || levels[font] || 'h2'}
    font={font || fonts[asProp] || 'title-l'}
    {...props}
  />
));

Heading.propTypes = {
  as: oneOfType([string, node]),
  font: string,
};

export default Heading;
