import React from 'react';
import { any, oneOf } from 'prop-types';
import styled from 'styled-components';

import Root from './Root';

const getPad = (size) => {
  switch (size) {
    case 'hero': return 'xxLarge';
    case 'title': return 'xLarge';
    case 'subtitle': return 'large';
    default: return 'large';
  }
};

const Heading = styled(({ size, level, ...props }) => (
  <Root
    size={size || level}
    // used only to force different h{level} than default
    level={level}
    pad={getPad(size || level)}
    {...props}
    marginBottom="xxLarge"
  />
))``;

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
