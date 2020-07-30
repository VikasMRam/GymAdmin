import React from 'react';
import { func, arrayOf, object, bool } from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/common/components/themes';
import { adminCommunityPropType } from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, FAMILY_DETAILS } from 'sly/web/constants/dashboardAppPaths';
import { Block, Button } from 'sly/web/components/atoms';
import DashboardAdminReferralCommunityTile from 'sly/web/components/organisms/DashboardAdminReferralCommunityTile';
import { FAMILIES_INTERESTED_COMMUNITY_TITLE } from 'sly/web/constants/referrals';

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    padding: ${size('spacing.xLarge')};
  }
`;
const EmptyResultWrapper = styled.div`
  padding: ${size('spacing', 'xLarge')} ${size('spacing', 'large')};
`;

const EmptyResultTextBlock = pad(styled(Block)`
  text-align: center;
`, 'large');

const CommunitiesWrapper = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const SendNewReferralButton = styled(Button)`
  margin-left: auto;
`;

const StyledDashboardAdminReferralCommunityTile = pad(DashboardAdminReferralCommunityTile);

const DashboardCommunityReferrals = ({
  communitiesInterested, communitiesInterestedIdsMap, childrenClients, childrenClientCommunityIdsMap, isAdminUser, onSubmit, setSelectedCommunity,
}) => {
  return (
    <>
      <TopWrapper>
        <Block size="subtitle">Communities</Block>
        <SendNewReferralButton onClick={() => onSubmit()}>Search for communities</SendNewReferralButton>
      </TopWrapper>
      {childrenClients.length === 0 && (
        <EmptyResultWrapper>
          <EmptyResultTextBlock palette="grey" variation="dark">You haven’t sent any referrals to any communities yet. </EmptyResultTextBlock>
        </EmptyResultWrapper>
      )}
      <CommunitiesWrapper>
        {communitiesInterested.map((community) => {
            const client = childrenClientCommunityIdsMap[community.id];
            const props = {
              key: community.name,
              community,
              title: FAMILIES_INTERESTED_COMMUNITY_TITLE,
              isAdminUser,
            };
            if (client) {
              const { id, stage, createdAt } = client;
              const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
                id,
                tab: FAMILY_DETAILS,
              });
              return (
                <StyledDashboardAdminReferralCommunityTile
                  {...props}
                  stage={stage}
                  referralSentAt={createdAt}
                  childFamilyPath={familyDetailsPath}
                />
                );
            }
            return (<StyledDashboardAdminReferralCommunityTile
              {...props}
              actionText="Send Referral"
              actionClick={() => setSelectedCommunity(community)}
            />);
          })
        }
        {childrenClients.map((client) => {
          const { id } = client;
          const communityInterested = communitiesInterestedIdsMap[client.provider.id];
          if (communityInterested) {
            return null;
          }
          const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
            id,
            tab: FAMILY_DETAILS,
          });
          const community = client.provider;
          community.propInfo = {};
          return (
            <StyledDashboardAdminReferralCommunityTile
              key={client.name}
              community={community}
              stage={client.stage}
              referralSentAt={client.createdAt}
              isAdminUser={isAdminUser}
              childFamilyPath={familyDetailsPath}
            />
            );
          })
        }
      </CommunitiesWrapper>
    </>
  );
};

DashboardCommunityReferrals.propTypes = {
  setSelectedCommunity: func,
  onSubmit: func,
  communitiesInterested: arrayOf(adminCommunityPropType),
  childrenClients: arrayOf(adminCommunityPropType),
  childrenClientCommunityIdsMap: object,
  communitiesInterestedIdsMap: object,
  isAdminUser: bool,
};

export default DashboardCommunityReferrals;
