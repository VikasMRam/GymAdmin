import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { Block } from 'sly/common/components/atoms';

const Section = styled(Block)`
  width: 100%;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
    padding-left: 0px;
    padding-right: 0px;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

export default Section;