import React from 'react';
import styled from 'styled-components';
import { oneOf } from 'prop-types';

import Root from './Root';

import {
  withText,
  withColor,
  withSpacing,
  withAlign,
} from 'sly/common/components/helpers';

const getPad = (size) => {
  switch (size) {
    case 'hero': return 'xxLarge';
    case 'title': return 'xLarge';
    case 'subtitle': return 'large';
    default: return 'large';
  }
};

const Heading = styled(props => (
  <Root
    size={props.size || props.level}
    pad={getPad(props.size)}
    {...props}
  />
))`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withAlign}
`;

Heading.propTypes = {
  level: oneOf(['hero', 'title', 'subtitle']).isRequired,
};

Heading.defaultProps = {
  level: 'title',
  palette: 'slate',
  variation: 'base',
  weight: 'medium',
};

export default Heading;
