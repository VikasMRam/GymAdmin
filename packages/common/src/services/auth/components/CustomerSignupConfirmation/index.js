import React, { Component } from 'react';
import { func, object } from 'prop-types';

import { Icon, Heading, Button, Paragraph, Block } from 'sly/common/components/atoms';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';

const StyledIcon = pad(Icon, 'large');
const StyledHeading = pad(Heading, 'large');
const FullWidthButton = fullWidth(Button);
const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');

export default class CustomerSignupConfirmation extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    user: object.isRequired,
  };

  render() {
    const { onSubmit, user } = this.props;
    return (
      <Block align="center">
        <StyledIcon icon="round-checkmark" palette="primary" variation="base" size="hero" />
        <StyledHeading> Welcome {user ? user.name : '?'}</StyledHeading>
        <Paragraph>Your account is all set up</Paragraph>
        <LargePaddedFullWidthButton onClick={onSubmit}>Continue</LargePaddedFullWidthButton>
      </Block>
    );
  }
}
