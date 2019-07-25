import styled from 'styled-components';

import { size } from 'sly/components/themes';

const mobileOnly = (Component, css) => styled(Component)`
  @media screen and (max-width: calc(${size('breakpoint.tablet')} - 1px)) {
    ${css}; 
  }
`;

export default mobileOnly;
