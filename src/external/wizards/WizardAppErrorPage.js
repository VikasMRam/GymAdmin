import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

const Wrapper = styled.div`
  position: relative;
  background-color: ${palette('white', 0)};
  margin: calc(${size('breakpoint.tablet')}/4) auto;
  content-align: center;
  text-align: center;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width:${size('breakpoint.tablet')};
  }
`;

const WizardAppErrorPage = () => {
  return (
    <Wrapper>
      Shhh... Nothing here
    </Wrapper>
  );
};

export default WizardAppErrorPage;
