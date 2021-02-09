import styled from 'styled-components';

import { size } from 'sly/common/components/themes';

const pad = (Component, which = 'xLarge') => styled(Component)`
  margin-bottom: ${size('spacing', which)};
`;

export default pad;
