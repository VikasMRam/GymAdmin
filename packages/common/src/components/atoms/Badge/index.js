
import styled from 'styled-components';

import props from './props';

import { size } from 'sly/common/components/themes';
import { Block } from 'sly/common/components/atoms';

const Badge = styled(Block)`
  display: inline-flex;
  align-items: center;
  padding: ${size('spacing.tiny')} ${size('spacing.regular')};
`;

Badge.defaultProps = props.defaultProps;

export default Badge;
