import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';

const shadow = (Component, spread = 'regular') => styled(Component)`
  box-shadow: 0 0 ${size('spacing', spread)} ${palette('slate', 'filler')}80;
`;

export default shadow;
