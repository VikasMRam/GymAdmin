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
  withCss,
  withMedia,
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
  ${withWidth}
  ${withHeight}
  // put withDisplay after other styles for applied display styles to have more priority
  ${withDisplay}
  ${withCss}
  // put withMedia first for media query styles to have first priority
  ${withMedia}
`;

Block.propTypes = {
  showIf: bool,
};

Block.defaultProps = {
  showIf: true,
  display: 'block',
};

export default Block;
