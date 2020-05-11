import styled from 'styled-components';

const textAlign = (Component, which = 'center') => styled(Component)`
  text-align: ${which};
`;

export default textAlign;
