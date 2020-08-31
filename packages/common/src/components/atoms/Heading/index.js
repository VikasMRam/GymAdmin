import React from 'react';
import { any, oneOf } from 'prop-types';

import Root from './Root';

const getPad = (size) => {
  switch (size) {
    case 'hero': return 'xxLarge';
    case 'title': return 'xLarge';
    case 'subtitle': return 'large';
    default: return 'large';
  }
};

const Heading = ({ size, level, ...props }) => (
  <Root
    size={size || level}
    pad={getPad(size || level)}
    {...props}
    marginBottom="xxLarge"
  />
);

Heading.displayName = 'Heading';

Heading.propTypes = {
  size: oneOf(['hero', 'title', 'subtitle', 'body']).isRequired,
  level: any, // should be deprecated
};

Heading.defaultProps = {
  size: 'title',
  palette: 'slate',
  variation: 'base',
  weight: 'medium',
};

export default Heading;
