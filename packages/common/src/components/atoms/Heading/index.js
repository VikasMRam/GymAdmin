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

const StyledHeading = styled(({ innerRef, size, level, ...props }) => (
  <Root
    ref={innerRef}
    size={size || level}
    // used only to force different h{level} than default
    level={level}
    pad={getPad(size || level)}
    marginBottom="xxLarge"
    {...props}
  />
))``;

StyledHeading.propTypes = {
  size: oneOf(['hero', 'title', 'subtitle', 'body']).isRequired,
  level: any, // should be deprecated
};

StyledHeading.defaultProps = {
  size: 'title',
  palette: 'slate',
  variation: 'base',
  weight: 'medium',
};

const Heading = React.forwardRef((props, ref) => <StyledHeading innerRef={ref} {...props} />);

Heading.displayName = 'Heading';

export default Heading;
