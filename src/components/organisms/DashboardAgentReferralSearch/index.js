import React from 'react';
import { func, arrayOf, object } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { Block, Hr } from 'sly/components/atoms';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';
import { adminCommunityPropType } from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';

const Wrapper = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const SendReferralTitleBlock = pad(Block);

const StyledDashboardAdminReferralAgentTile = styled(DashboardAdminReferralAgentTile)`
  margin-top: ${size('spacing.large')};

  &:hover {
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('grey', 'stroke')};
    box-shadow: ${ifProp('disabled', 'none')};
  }
`;

const CursorStyledDashboardAdminReferralAgentTile = cursor(StyledDashboardAdminReferralAgentTile);

const DashboardAgentReferralSearch = ({
  agents, childrenClientAgentIdsMap, handleAgentSearch, setSelectedAgent, onSubmit, handleLocationSearch,
}) => (
  <Wrapper>
    <SendReferralTitleBlock size="subtitle">Send referral to agent</SendReferralTitleBlock>
    <DashboardCommunityAgentSearchBox label="Find an agent" handleSubmit={handleAgentSearch} handleLocationSearch={handleLocationSearch} />
    {!agents &&
    <>
      <Hr size="large" />
      <Block>Search for Agents by entering Name or Zip </Block>
    </>
    }
    {(agents && agents.length === 0) &&
    <>
      <Hr size="large" />
      <Block>No Agents found; Try searching another Name or Zip </Block>
    </>
    }
    {(agents && agents.length > 0) && (
      <>
        <Hr size="large" />
        <Block>Showing {agents.length} Agents</Block>
        {agents.map((agent, idx) => {
          const client = childrenClientAgentIdsMap[agent.id];
          if (client) {
            const { stage } = client;
            return <StyledDashboardAdminReferralAgentTile key={agent.id} agent={agent} stage={stage} disabled isRecommended={idx === 0} />;
          }
          return <CursorStyledDashboardAdminReferralAgentTile key={agent.id} agent={agent} onClick={() => { setSelectedAgent(agent); onSubmit(); }} isRecommended={idx === 0} />;
        })}
      </>
    )}
  </Wrapper>
);

DashboardAgentReferralSearch.propTypes = {
  handleAgentSearch: func.isRequired,
  handleLocationSearch: func.isRequired,
  setSelectedAgent: func,
  sendReferral: func,
  onSubmit: func,
  agents: arrayOf(adminCommunityPropType),
  childrenClientAgentIdsMap: object,
};

export default DashboardAgentReferralSearch;
