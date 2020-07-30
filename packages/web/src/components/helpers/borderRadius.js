import styled from 'styled-components';

import { size } from 'sly/common/components/themes';

const borderRadius = (Component, radiusSize = 'xLarge') => styled(Component)`
  border-radius: ${size('border', radiusSize)};
`;

export default borderRadius;
