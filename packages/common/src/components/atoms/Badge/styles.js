import { css } from 'styled-components';

import commonStyles from './styles.common';

import { size } from 'sly/common/components/themes';

export default css`
  ${commonStyles}
  display: inline-flex;
  align-items: center;
  padding: ${size('spacing.tiny')} ${size('spacing.regular')};
`;
