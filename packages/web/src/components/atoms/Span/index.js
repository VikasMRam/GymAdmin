import styled from 'styled-components';

import { withColor, withText } from 'sly/web/components/helpers';

const Span = styled.span`
  ${withText}
  ${withColor}
`;

export default Span;
