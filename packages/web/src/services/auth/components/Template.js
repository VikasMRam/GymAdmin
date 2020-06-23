import styled from 'styled-components';

import { size } from 'sly/web/components/themes';

export const Wrapper = styled.section`
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: min-content;
    min-width: ${size('layout.col6')};
  }
`;
