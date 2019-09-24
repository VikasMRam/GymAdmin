import React, { Fragment } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Block, Button } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import clientPropType from 'sly/propTypes/client';
import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';

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

const ChildrenClientsWrapper = styled.div`
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
  }
`;

const StyledDashboardAdminReferralAgentTile = pad(DashboardAdminReferralAgentTile);

const DashboardAgentReferrals = ({ onSendNewReferralClick, childrenClients }) => {
  const childrenComponents = [];
  if (childrenClients.length > 0) {
    childrenClients.forEach((childrenClient) => {
      const { stage, provider, createdAt } = childrenClient;
      const component = <StyledDashboardAdminReferralAgentTile stage={stage} agent={provider} referralSentAt={createdAt} />;
      childrenComponents.push(component);
    });
  }

  return (
    <Fragment>
      <TopWrapper>
        <Block size="subtitle">Agents</Block>
        <SendNewReferralButton onClick={() => onSendNewReferralClick()}>Send a new referral</SendNewReferralButton>
      </TopWrapper>
      {childrenComponents.length === 0 && (
        <EmptyResultWrapper>
          <EmptyResultTextBlock palette="grey" variation="dark">You haven’t sent any referrals to any agents yet. </EmptyResultTextBlock>
          <SmallMobileSendNewReferralButton onClick={() => onSendNewReferralClick()}>Send a new referral</SmallMobileSendNewReferralButton>
        </EmptyResultWrapper>
      )}
      {childrenComponents.length > 0 && <ChildrenClientsWrapper>{childrenComponents}</ChildrenClientsWrapper>}
    </Fragment>
  );
};

DashboardAgentReferrals.propTypes = {
  onSendNewReferralClick: func,
  childrenClients: clientPropType,
};

export default DashboardAgentReferrals;
