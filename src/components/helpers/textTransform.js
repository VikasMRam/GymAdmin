import styled from 'styled-components';

const textTransform = (Component, transform = 'capitalize') => styled(Component)`
  text-transform: ${transform};
`;

export default textTransform;
