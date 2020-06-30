import styled from 'styled-components';

import { withText, withColor, withSpacing, withBorder, withAlign, withSnap } from 'sly/web/components/helpers';

const Block = styled.div`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
`;

export default Block;
