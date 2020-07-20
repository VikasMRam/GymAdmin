import { css } from 'styled-components';

import commonStyles from './styles.common';

// todo: all these sly/common
import { size } from 'sly/web/components/themes';

export default css`
  ${commonStyles}
  display: inline-flex;
  align-items: center;
  padding: ${size('spacing.tiny')} ${size('spacing.regular')};
`;
