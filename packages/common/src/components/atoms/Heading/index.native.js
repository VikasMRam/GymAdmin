import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import props from './props';
import getMarginBottom from './getMarginBottom';

import {
  withText,
  withColor,
} from 'sly/common/components/helpers';

const Heading = styled(props => (
  <Text
    size={props.size || props.level}
    {...props}
  />
))`
  margin-bottom: ${getMarginBottom};
  ${withText}
  ${withColor}
`;

Heading.propTypes = props.propTypes;

Heading.defaultProps = props.defaultProps;

export default Heading;
