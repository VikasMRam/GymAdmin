import React from 'react';
import { func, arrayOf, object, bool, shape, string } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import { Block, Hr } from 'sly/common/components/atoms';
import DashboardCommunityAgentSearchBox from 'sly/web/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminReferralCommunityTile from 'sly/web/components/organisms/DashboardAdminReferralCommunityTile';
import { adminCommunityPropType } from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import cursor from 'sly/web/components/helpers/cursor';
import { FAMILIES_INTERESTED_COMMUNITY_TITLE } from 'sly/web/constants/referrals';

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
  subtitle, communities, isAdminUser, childrenClientCommunityIdsMap, handleCommunitySearch, setSelectedCommunity, onSubmit, handleLocationSearch,
  preferredLocation, communitiesInterestedIdsMap,
}) => {
  const title = FAMILIES_INTERESTED_COMMUNITY_TITLE;
  return (
    <Wrapper>
      <SendReferralTitleBlock size="subtitle">{subtitle}</SendReferralTitleBlock>
      <DashboardCommunityAgentSearchBox label="Find a community" preferredLocation={preferredLocation} handleSubmit={handleCommunitySearch} handleLocationSearch={handleLocationSearch} />
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
      {(communities && communities.length > 0) && (
        <>
          <Hr size="large" />
          <Block>Showing {communities.length} Communities</Block>
          {communities.map((community) => {
            const props = {
              key: community.name,
              community,
              isAdminUser,
            };
            if (communitiesInterestedIdsMap[community.id]) {
              props.title = title;
            }
            const client = childrenClientCommunityIdsMap[community.id];
            if (client) {
            return <StyledDashboardAdminReferralCommunityTile {...props} disabled referralSentAt={client.createdAt} />;
            }
            return <CursorStyledDashboardAdminReferralCommunityTile {...props} onClick={() => { setSelectedCommunity(community); onSubmit(); }} />;
          })}
        </>
      )}
    </Wrapper>
  );
};

DashboardCommunityReferralSearch.propTypes = {
  subtitle: string,
  handleCommunitySearch: func.isRequired,
  handleLocationSearch: func.isRequired,
  setSelectedCommunity: func,
  sendReferral: func,
  handleSubmit: func,
  onSubmit: func,
  communities: arrayOf(adminCommunityPropType),
  isAdminUser: bool,
  childrenClientCommunityIdsMap: object,
  communitiesInterestedIdsMap: object,
  preferredLocation: shape({
    city: string,
    state: string,
  }),
};

export default DashboardCommunityReferralSearch;
