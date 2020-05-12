import styled from 'styled-components';

import { size } from 'sly/web/components/themes';

const borderRadius = (Component, radiusSize = 'xLarge') => styled(Component)`
  border-radius: ${size('border', radiusSize)};
`;

export default borderRadius;
