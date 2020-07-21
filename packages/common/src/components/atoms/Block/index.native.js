import React from 'react';
import { node } from 'prop-types';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import {
  withText,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
} from 'sly/common/components/helpers';
import { isString } from 'sly/common/services/helpers/utils';

const Component = props =>
  isString(props.children) ? <Text {...props} /> : <View {...props} />;
Component.propTypes = {
  children: node.isRequired,
};

const Block = styled(Component)`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
  ${withClamping}
`;

export default Block;
