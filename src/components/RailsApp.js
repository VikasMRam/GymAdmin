import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ConversionForm } from 'sly/components/organisms';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';
import setGlobalStyles from './themes/setGlobalStyles';

const StyledDiv = styled.div`
  width: 336px;
`;

export default class RailsApp extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledDiv>
          <ConversionForm /> 
        </StyledDiv>
      </ThemeProvider>
    );
  }
}
