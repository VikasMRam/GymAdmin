import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

import {
  withDisplay,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
  withWidth,
} from 'sly/common/components/helpers';
import { View } from 'sly/mobile/components/atoms';

const StyledView = styled(View)`
  ${withColor}
  ${withBorder}
  ${withAlign}
  ${withSnap}
  ${withClamping}
  ${withSpacing}
  ${withWidth}
  ${withDisplay}

  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

// hr is not supposed to render content, hence don't pass children prop
const Root = ({ children, ...props }) => <StyledView {...props} />;

Root.propTypes = {
  children: node,
};

export default Root;