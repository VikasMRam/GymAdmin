import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';

const shadow = Component => styled(Component)`
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.large')} ${palette('slate', 'filler')}80;
`;

export default shadow;
