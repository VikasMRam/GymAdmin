import styled from 'styled-components';

import { setDisplayName } from 'sly/web/components/helpers/index';

export const textAlign = (Component, which = 'center') => styled(Component)`
  text-align: ${which};
`;

export const textDecoration = (Component, decoration = 'underline') => setDisplayName(styled(Component)`
  text-decoration: ${decoration};
`, Component.displayName);

export const textTransform = (Component, transform = 'capitalize') => styled(Component)`
  text-transform: ${transform};
`;
