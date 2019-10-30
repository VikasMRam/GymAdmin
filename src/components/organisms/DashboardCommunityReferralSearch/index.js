import React from 'react';
import { func, arrayOf, object, bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { Block, Hr } from 'sly/components/atoms';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import DashboardAdminCommunityAgentList from 'sly/components/organisms/DashboardAdminCommunityAgentList';
import { adminCommunityPropType } from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';

const Wrapper = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const SendReferralTitleBlock = pad(Block);

const StyledDashboardAdminReferralCommunityTile = styled(DashboardAdminReferralCommunityTile)`
  margin-top: ${size('spacing.large')};

  &:hover {
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('grey', 'stroke')};
    box-shadow: ${ifProp('disabled', 'none')};
  }
`;

const CursorStyledDashboardAdminReferralCommunityTile = cursor(StyledDashboardAdminReferralCommunityTile);

const DashboardCommunityReferralSearch = ({
  communities, isAdminUser, childrenClientCommunityIdsMap, handleCommunitySearch, setSelectedCommunity, onSubmit, handleLocationSearch, showAgentList,
}) => {
  return (
    <Wrapper>
      <SendReferralTitleBlock size="subtitle">Send referral to a community</SendReferralTitleBlock>
      <DashboardCommunityAgentSearchBox label="Find a community" handleSubmit={handleCommunitySearch} handleLocationSearch={handleLocationSearch} />
      {!communities &&
      <>
        <Hr size="large" />
        <Block>Search for Communities by entering Name or Zip</Block>
      </>
      }
      {(communities && communities.length === 0) &&
      <>
        <Hr size="large" />
        <Block>No Communities found; Try searching another Name or Zip</Block>
      </>
      }
      {!showAgentList && (communities && communities.length > 0) && (
        <>
          <Hr size="large" />
          <Block>Showing {communities.length} Communities</Block>
          {communities.map((community) => {
            const props = {
              key: community.name,
              community,
              isAdminUser,
            };
            const client = childrenClientCommunityIdsMap[community.id];
            if (client) {
            return <StyledDashboardAdminReferralCommunityTile {...props} disabled referralSentAt={client.createdAt} />;
            }
            return <CursorStyledDashboardAdminReferralCommunityTile {...props} onClick={() => { setSelectedCommunity(community); onSubmit(); }} />;
          })}
        </>
      )}
      {showAgentList && (communities && communities.length > 0) && (
        <DashboardAdminCommunityAgentList communitiesWithAgents={communities} />
      )}
    </Wrapper>
  );
};

DashboardCommunityReferralSearch.propTypes = {
  handleCommunitySearch: func.isRequired,
  handleLocationSearch: func.isRequired,
  setSelectedCommunity: func,
  sendReferral: func,
  handleSubmit: func,
  onSubmit: func,
  communities: arrayOf(adminCommunityPropType),
  isAdminUser: bool,
  childrenClientCommunityIdsMap: object,
  showAgentList: bool,
};

export default DashboardCommunityReferralSearch;
