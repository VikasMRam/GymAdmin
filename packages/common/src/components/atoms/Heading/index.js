import React, { forwardRef } from 'react';
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

const Heading = forwardRef(({ size, level, ...props }, ref) => (
  <Root
    ref={ref}
    size={size || level}
    // used only to force different h{level} than default
    level={level}
    pad={getPad(size || level)}
    marginBottom="xxLarge"
    {...props}
  />
));

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

Heading.displayName = 'Heading';

export default Heading;
