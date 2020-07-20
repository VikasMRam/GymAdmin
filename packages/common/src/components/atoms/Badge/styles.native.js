import { css } from 'styled-components';

import commonStyles from './styles.common';

import { size } from 'sly/common/components/themes';

export default css`
  ${commonStyles}
  alignSelf: flex-start;
  paddingTop: ${size('spacing.tiny')};
  paddingBottom: ${size('spacing.tiny')};
  paddingRight: ${size('spacing.regular')};
  paddingLeft: ${size('spacing.regular')};
`;
