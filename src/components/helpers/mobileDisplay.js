import styled from 'styled-components';

import { size } from 'sly/components/themes';

const mobileDisplay = (Component, from = 'none', to = 'block') => styled(Component)`
  & {
    display: ${from};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: ${to};
  }
`;

export default mobileDisplay;
