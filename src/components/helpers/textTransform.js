import styled from 'styled-components';

import { setDisplayName } from 'sly/components/helpers';

const textTransform = (Component, transform = 'capitalize') => setDisplayName(styled(Component)`
  text-transform: ${transform};
`, Component.displayName);

export default textTransform;
