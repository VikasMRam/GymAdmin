import styled from 'styled-components';

import { size } from 'sly/components/themes';

const spacing = (Component, { top = 'xLarge', bottom = 'xLarge', left = 'xLarge', right = 'xLarge' }) => styled(Component)`
  padding-top: ${size('spacing', top)};
  padding-bottom: ${size('spacing', bottom)};
  padding-left: ${size('spacing', left)};
  padding-right: ${size('spacing', right)};
`;

export default spacing;
