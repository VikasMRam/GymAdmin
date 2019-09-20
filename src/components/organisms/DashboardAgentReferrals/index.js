import React, { Fragment } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Block, Button } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    padding: ${size('spacing.xLarge')};
  }
`;

const SendNewReferralButton = styled(Button)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: block;
    margin-left: auto;
  }
`;

const EmptyResultWrapper = styled.div`
  padding: ${size('spacing', 'xxxLarge')} ${size('spacing', 'large')};
`;

const EmptyResultTextBlock = pad(styled(Block)`
  text-align: center;
`, 'large');


const SmallMobileSendNewReferralButton = styled(Button)`
  display: block;
  margin: 0 auto;

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: none;
  }
`;

const DashboardAgentReferrals = ({ onSubmit }) => (
  <Fragment>
    <TopWrapper>
      <Block size="subtitle">Agents</Block>
      <SendNewReferralButton onClick={() => onSubmit()}>Send a new referral</SendNewReferralButton>
    </TopWrapper>
    <EmptyResultWrapper>
      <EmptyResultTextBlock palette="grey" variation="dark">You haven’t sent any referrals to any agents yet. </EmptyResultTextBlock>
      <SmallMobileSendNewReferralButton onClick={() => onSubmit()}>Send a new referral</SmallMobileSendNewReferralButton>
    </EmptyResultWrapper>
  </Fragment>
);

DashboardAgentReferrals.propTypes = {
  onSubmit: func,
};

export default DashboardAgentReferrals;
