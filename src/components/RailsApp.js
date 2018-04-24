import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import theme from './themes/default';
import setGlobalStyles from './themes/setGlobalStyles';
import RCBModalContainer from 'sly/containers/RCBModalContainer';
import ConciergeContainer from 'sly/containers/ConciergeContainer';

const StyledDiv = styled.div`
  width: 336px;
`;

const communitySlug = window.location.pathname.replace(/[\/\s]*$/, '').split('/').pop();

export default class RailsApp extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledDiv>
          <ConciergeContainer communitySlug={communitySlug} />
        </StyledDiv>
      </ThemeProvider>
    );
  }
}

