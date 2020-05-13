import React, { Component } from 'react';
import { func, object } from 'prop-types';
import styled from 'styled-components';

import { Icon, Heading, Button, Paragraph } from 'sly/web/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';


const Wrapper = styled.div`
  text-align: center;
`;
const StyledIcon = pad(Icon, 'large');
const StyledHeading = pad(Heading, 'large');
const FullWidthButton = fullWidth(Button);
const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');

export default class CustomerSignupConfirmation extends Component {
  static propTypes = {
    onSubmit: func,
    user: object
  };

  render() {
    const { onSubmit, user } = this.props;
    return (
      <Wrapper>
         <StyledIcon icon="round-checkmark" palette="secondary" variation="dark35" size="large" />
         <StyledHeading> Welcome {user ? user.name : ''}</StyledHeading>
        <Paragraph> Your account is all set up </Paragraph>
        <LargePaddedFullWidthButton onClick={onSubmit}>Continue</LargePaddedFullWidthButton>
      </Wrapper>
    );
  }
}
