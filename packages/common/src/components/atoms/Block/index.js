import React from 'react';
import styled from 'styled-components';
import { bool } from 'prop-types';

import Root from './Root';

import {
  withDisplay,
  withText,
  withElementSize,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
  withOverflow,
  withCursor,
  withWidth,
  withHeight,
} from 'sly/common/components/helpers';

const Block = styled(({ showIf, ...props }) => {
  if (!showIf) {
    return null;
  }
  return <Root {...props} display="block" />;
})`
  ${withSpacing}
  ${withText}
  ${withElementSize}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
  ${withClamping}
  ${withCursor}
  ${withOverflow}
  // put withDisplay before flex to make sure that this display styles are always first priority
  ${withWidth}
  ${withHeight}
  ${withDisplay}
`;

Block.propTypes = {
  showIf: bool,
};

Block.defaultProps = {
  showIf: true,
};

export default Block;
