import styled from 'styled-components';

import Root from './Root';

import {
  withDisplay,
  withText,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
  withCursor,
} from 'sly/common/components/helpers';

const Block = styled(Root)`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
  ${withClamping}
  ${withCursor}
  ${withDisplay}
`;
// put withDisplay last to make sure that this display styles are always first priority

export default Block;
