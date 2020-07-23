import styled from 'styled-components';

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

const Block = styled.div`
  ${withDisplay}
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
  ${withClamping}
  ${withCursor}
`;

export default Block;
