import React from 'react';
import { func, arrayOf, object } from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import { Heading, Block, Button, Link } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import clientPropType from 'sly/propTypes/client';
import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, FAMILY_DETAILS } from 'sly/constants/dashboardAppPaths';
import cursor from 'sly/components/helpers/cursor';

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
const CursorStyledDashboardAdminReferralAgentTile = cursor(StyledDashboardAdminReferralAgentTile);

const DashboardAgentReferrals = ({ onSendNewReferralClick, childrenClients, recommendedAgents, recommendedAgentsIdsMap, setSelectedAgent }) => {
  const childrenComponents = [];

  if (childrenClients.length > 0) {
    childrenClients.forEach((childrenClient) => {
      const { id, stage, provider, createdAt } = childrenClient;
      const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
        id,
        tab: FAMILY_DETAILS,
      });
      const component = <Link to={familyDetailsPath}><StyledDashboardAdminReferralAgentTile stage={stage} agent={provider} referralSentAt={createdAt} /></Link>;
      childrenComponents.push(component);
    });
  }
  const title = 'Agent Recommended by Seniorly';
  const recommendedAgentComponents = [];
  recommendedAgentComponents.push(<Heading level="subtitle">Recommended Agents:</Heading>);
  recommendedAgents.forEach((agent) => {
    // const client = recommendedAgentsIdsMap[agent.id];
    const props = {
      key: agent.name,
      agent,
      title,
    };
    recommendedAgentComponents.push((
      <CursorStyledDashboardAdminReferralAgentTile
        {...props}
        agent={agent}
        onClick={() => {
          setSelectedAgent(agent);
        }}
      />
    ));
  });
  return (
    <>
      <TopWrapper>
        <Block size="subtitle">Agents</Block>
        <SendNewReferralButton onClick={onSendNewReferralClick}>Send a new referral</SendNewReferralButton>
      </TopWrapper>
      {childrenComponents.length === 0 && (
        <EmptyResultWrapper>
          <EmptyResultTextBlock palette="grey" variation="dark">You haven’t sent any referrals to any agents yet. </EmptyResultTextBlock>
          <SmallMobileSendNewReferralButton onClick={onSendNewReferralClick}>Send a new referral</SmallMobileSendNewReferralButton>
        </EmptyResultWrapper>
      )}
      {childrenComponents.length > 0 && <ChildrenClientsWrapper>{childrenComponents}</ChildrenClientsWrapper>}
      {recommendedAgentComponents.length > 1 && <ChildrenClientsWrapper>{recommendedAgentComponents}</ChildrenClientsWrapper>}
    </>
  );
};

DashboardAgentReferrals.propTypes = {
  setSelectedAgent: func,
  onSendNewReferralClick: func,
  childrenClients: arrayOf(clientPropType),
  recommendedAgents: arrayOf(object),
  recommendedAgentsIdsMap: object,
};

export default DashboardAgentReferrals;
