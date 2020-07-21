import styled from 'styled-components';

import {
  withText,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
} from 'sly/common/components/helpers';

const Block = styled.div`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
  ${withClamping}
`;

export default Block;
