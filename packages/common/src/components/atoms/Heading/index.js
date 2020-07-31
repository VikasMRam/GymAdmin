import React from 'react';
import { oneOf, string } from 'prop-types';

import Root from './Root';

const getPad = (size) => {
  switch (size) {
    case 'hero': return 'xxLarge';
    case 'title': return 'xLarge';
    case 'subtitle': return 'large';
    default: return 'large';
  }
};

const Heading = props => (
  <Root
    size={props.size || props.level}
    pad={getPad(props.size)}
    {...props}
  />
);

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
