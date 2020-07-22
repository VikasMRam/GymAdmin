import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import {
  withDisplay,
  withText,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
} from 'sly/common/components/helpers';
import { isString } from 'sly/common/services/helpers/utils';

const Block = styled(props =>
  isString(props.children) ? <Text {...props} /> : <View {...props} />)`
  ${withDisplay}
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
  ${withClamping}
`;

export default Block;
