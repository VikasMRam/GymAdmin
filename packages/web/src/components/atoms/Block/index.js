import styled from 'styled-components';

import { withText, withColor, withSpacing, withBorder, withAlign } from 'sly/web/components/helpers';

const Block = styled.div`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withAlign}
`;

export default Block;
