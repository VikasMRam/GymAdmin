import styled from 'styled-components';

import { setDisplayName } from 'sly/web/components/helpers';

const textDecoration = (Component, decoration = 'underline') => setDisplayName(styled(Component)`
  text-decoration: ${decoration};
`, Component.displayName);

export default textDecoration;
