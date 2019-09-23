import React, { Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
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
  agents, handleAgentSearch, setSelectedAgent, transformAgent, onSubmit,
}) => (
  <Wrapper>
    <SendReferralTitleBlock size="subtitle">Send referral to agent</SendReferralTitleBlock>
    <DashboardCommunityAgentSearchBox label="Find an agent" handleSubmit={handleAgentSearch} />
    {agents && agents.length > 0 && (
      <Fragment>
        <Hr size="large" />
        <Block>Showing {agents.length} agents</Block>
        {agents.map((agent) => {
          const props = transformAgent(agent);
          return <CursorStyledDashboardAdminReferralAgentTile {...props} onClick={() => { setSelectedAgent(agent); onSubmit(); }} />;
        })}
      </Fragment>
    )}
  </Wrapper>
);

DashboardAgentReferralSearch.propTypes = {
  handleAgentSearch: func.isRequired,
  setSelectedAgent: func,
  sendReferral: func,
  transformAgent: func,
  onSubmit: func,
  agents: arrayOf(adminCommunityPropType),
};

export default DashboardAgentReferralSearch;
