import styled from 'styled-components';

import props from './props';

import { withShadow } from 'sly/common/components/helpers';
import Block from 'sly/common/components/atoms/Block';

const Box = styled(Block)`
  ${withShadow}
`;

Box.defaultProps = props.defaultProps;

export default Box;
