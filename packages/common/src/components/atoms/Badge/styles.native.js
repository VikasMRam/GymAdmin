import { css } from 'styled-components';

import commonStyles from './styles.common';

// todo: all these sly/common
import { size } from 'sly/web/components/themes';

export default css`
  ${commonStyles}
  alignSelf: flex-start;
  paddingTop: ${size('spacing.tiny')};
  paddingBottom: ${size('spacing.tiny')};
  paddingRight: ${size('spacing.regular')};
  paddingLeft: ${size('spacing.regular')};
`;
