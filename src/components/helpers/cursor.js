import styled from 'styled-components';

import { setDisplayName } from 'sly/components/helpers';

const cursor = Component => setDisplayName(styled(Component)`
  cursor: pointer;
`, Component.displayName);

export default cursor;
