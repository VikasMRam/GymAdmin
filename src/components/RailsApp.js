import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ConversionForm } from 'sly/components/organisms';
import  { reduxForm } from 'redux-form';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';
import setGlobalStyles from './themes/setGlobalStyles';

const StyledDiv = styled.div`
  width: 336px;
`;

const ConversionFormContainer = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
})(ConversionForm);

export default class RailsApp extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledDiv>
          <ConversionFormContainer />
        </StyledDiv>
      </ThemeProvider>
    );
  }
}
