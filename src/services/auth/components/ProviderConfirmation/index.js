import React, { Component } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';

import { Icon, Heading, Button, Paragraph } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import {
  DASHBOARD_COMMUNITIES_PATH,
} from 'sly/constants/dashboardAppPaths';


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
    mode: string,
  };

  render() {
    const { mode, onSubmit } = this.props;
    return (
      <>
        {mode === 'Approved' &&
          <Wrapper>
            <StyledIcon icon="round-checkmark" palette="secondary" variation="dark35" size="large" />
            <StyledHeading> Our team will contact you to verify your details to complete the process.</StyledHeading>
            <Paragraph> In the meantime you can begin editingthis community's details. Please note: any details will only become public after being approved by Seniorly</Paragraph>
            <LargePaddedFullWidthButton href={DASHBOARD_COMMUNITIES_PATH}>Continue</LargePaddedFullWidthButton>

          </Wrapper>
        }
        {mode === 'NotFound' &&
        <Wrapper>
          <StyledHeading> You can add the community in your dashboard.</StyledHeading>
          <Paragraph>Please note: any details will only become public after being approved by Seniorly</Paragraph>
          <LargePaddedFullWidthButton href={DASHBOARD_COMMUNITIES_PATH}>Continue to dashboard</LargePaddedFullWidthButton>
        </Wrapper>
        }
        {mode === 'NeedApproval' &&
        <Wrapper>
          <StyledHeading> Thank you. Our team will contact you to verify your details to complete the process.</StyledHeading>
          <LargePaddedFullWidthButton onClick={onSubmit}>Finish</LargePaddedFullWidthButton>
        </Wrapper>
        }
      </>

    );
  }
}
