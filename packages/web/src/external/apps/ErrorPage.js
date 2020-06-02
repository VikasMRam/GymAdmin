import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { textAlign } from 'sly/web/components/helpers/text';

const Wrapper = textAlign(styled.div`
  background-color: ${palette('white', 'base')};
  margin: auto;
  margin-top: calc(${size('breakpoint.tablet')}/4);

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
