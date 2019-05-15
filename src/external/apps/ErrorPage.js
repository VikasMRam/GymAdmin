import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import textAlign from 'sly/components/helpers/textAlign';

const Wrapper = textAlign(styled.div`
  position: relative;
  background-color: ${palette('white', 'base')};
  margin: calc(${size('breakpoint.tablet')}/4) auto;
  content-align: center;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width:${size('breakpoint.tablet')};
  }
`);

const ErrorPage = () => {
  return (
    <Wrapper>
      Shhh... Nothing here
    </Wrapper>
  );
};

export default ErrorPage;
