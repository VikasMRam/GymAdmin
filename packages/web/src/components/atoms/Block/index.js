import styled from 'styled-components';

import { withText, withColor, withSpacing, withBorder } from 'sly/web/components/helpers';

const Block = styled.div`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
`;

export default Block;
