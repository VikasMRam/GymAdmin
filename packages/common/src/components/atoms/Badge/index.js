
import styled from 'styled-components';

import Block from 'sly/common/components/atoms/Block';

const Badge = styled(Block)`
  align-items: center;
`;

Badge.defaultProps = {
  display: 'inline-flex',
  padding: ['tiny', 'regular'],
  background: 'warning',
  backgroundVariation: 'base',
  palette: 'slate',
  size: 'tiny',
  weight: 'medium',
  borderRadius: 'large',
};

export default Badge;
