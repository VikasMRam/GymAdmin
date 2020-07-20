import styled from 'styled-components';

import styles  from './styles';
import props  from './props';

const Badge = styled.div`
  ${styles}
`;

Badge.propTypes = props.propTypes;

Badge.defaultProps = props.defaultProps;

export default Badge;
