import styled from 'styled-components';

import { size } from 'sly/components/themes';

const mobileOnly = (Component, css, otherwiseCss) => styled(Component)`
  @media screen and (max-width: calc(${size('breakpoint.tablet')} - 1px)) {
    ${css};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${otherwiseCss};
  }
`;

export default mobileOnly;
