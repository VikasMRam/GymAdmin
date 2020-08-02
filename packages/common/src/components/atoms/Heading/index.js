import React from 'react';
import { oneOf, string } from 'prop-types';
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

// styled wrapper is required to allow this component to be reffered in css tyles like ${Heading}: {}
const Heading = styled(props => (
  <Root
    size={props.size || props.level}
    pad={getPad(props.size)}
    {...props}
  />
))``;

Heading.propTypes = {
  level: oneOf(['hero', 'title', 'subtitle']).isRequired,
  size: string,
};

Heading.defaultProps = {
  level: 'title',
  palette: 'slate',
  variation: 'base',
  weight: 'medium',
};

export default Heading;
