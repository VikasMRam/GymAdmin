import styled from 'styled-components';

import { withText } from 'sly/web/components/helpers/text';
import { withPad } from 'sly/web/components/helpers/pad';
import { withColor } from 'sly/web/components/helpers/color';

const Block = styled.div`
  ${withPad}
  ${withText}
  ${withColor}
`;

export default Block;
