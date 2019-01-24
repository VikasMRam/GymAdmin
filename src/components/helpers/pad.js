import styled from 'styled-components';

import { size } from 'sly/components/themes';

const pad = Component => styled(Component)`
  margin-bottom: ${size('spacing.xLarge')};
`;

export default pad;
