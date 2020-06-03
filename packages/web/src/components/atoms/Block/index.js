import styled from 'styled-components';

import { withText, withColor, withSpacing } from 'sly/web/components/helpers';

const Block = styled.div`
  ${withSpacing}
  ${withText}
  ${withColor}
`;

export default Block;
