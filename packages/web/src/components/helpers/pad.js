import styled from 'styled-components';

import { size } from 'sly/components/themes';

const pad = (Component, which = 'xLarge') => styled(Component)`
  margin-bottom: ${size('spacing', which)};
`;

export default pad;
