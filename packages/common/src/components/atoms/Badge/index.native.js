import styled from 'styled-components/native';

import props  from './props';

import { size } from 'sly/common/components/themes';
import { Block } from 'sly/common/components/atoms';

const Badge = styled(Block)`
  alignSelf: flex-start;
  paddingTop: ${size('spacing.tiny')};
  paddingBottom: ${size('spacing.tiny')};
  paddingRight: ${size('spacing.regular')};
  paddingLeft: ${size('spacing.regular')};
`;

Badge.defaultProps = props.defaultProps;

export default Badge;
