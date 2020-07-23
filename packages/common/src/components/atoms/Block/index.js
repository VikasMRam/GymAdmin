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
