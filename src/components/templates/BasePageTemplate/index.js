import styled from 'styled-components';

import { size } from 'sly/components/themes';

export const TemplateContent = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

export const TemplateHeader = styled.header`
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

