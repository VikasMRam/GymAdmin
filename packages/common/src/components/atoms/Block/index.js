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
  withShadow,
} from 'sly/common/components/helpers';

const Block = styled(({ showIf, ...props }) => {
  if (!showIf) {
    return null;
  }
  return <Root {...props} />;
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
  ${withShadow}
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
  display: 'block',
};

export default Block;
