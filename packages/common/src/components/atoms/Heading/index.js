import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import Root from './Root';

const getPad = (size) => {
  if (size) {
    switch (size) {
      case 'hero': return 'xxLarge';
      case 'title': return 'xLarge';
      case 'subtitle': return 'large';
      default: return 'large';
    }
  }

  return null;
};

const Heading = styled(({ innerRef, size, level, ...props }) => (
  <Root
    ref={innerRef}
    size={size || level}
    // used only to force different h{level} than default
    level={level}
    pad={getPad(size || level, props.font)}
    {...props}
  />
))``;

Heading.propTypes = {
  level: any, // should be deprecated
};

Heading.defaultProps = {
  font: 'title-xlarge',
  palette: 'slate',
  variation: 'base',
  weight: 'medium',
};

Heading.displayName = 'Heading';

export default Heading;
