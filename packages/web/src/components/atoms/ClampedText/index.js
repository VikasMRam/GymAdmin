import styled from 'styled-components';

import Block from 'sly/web/components/atoms/Block';

const ClampedText = styled(Block)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ClampedText;
