import React from 'react';
import { func, arrayOf, object, bool } from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
import { getHasContract } from 'sly/services/helpers/communityReferral';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, FAMILY_DETAILS } from 'sly/constants/dashboardAppPaths';
import { Block, Button, Link } from 'sly/components/atoms';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    padding: ${size('spacing.xLarge')};
  }
`;

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
  const title = 'FAMILY INTERESTED IN COMMUNITY';
  return (
    <>
      <TopWrapper>
        <Block size="subtitle">Communities</Block>
        <SendNewReferralButton onClick={() => onSubmit()}>Send a new referral</SendNewReferralButton>
      </TopWrapper>
      <CommunitiesWrapper>
        {communitiesInterested.map((community) => {
            const client = childrenClientCommunityIdsMap[community.id];
            const hasContract = getHasContract(community);
            const showHasContract = hasContract && isAdminUser;
            const showNoContract = !hasContract && isAdminUser;
            const props = {
              key: community.name,
              community,
              title,
              showHasContract,
              showNoContract,
            };
            if (client) {
              const { id, stage, createdAt } = client;
              const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
                id,
                tab: FAMILY_DETAILS,
              });
              return (
                <Link to={familyDetailsPath}>
                  <StyledDashboardAdminReferralCommunityTile
                    {...props}
                    stage={stage}
                    referralSentAt={createdAt}
                  />
                </Link>);
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
          const hasContract = getHasContract(community);
          const showHasContract = hasContract && isAdminUser;
          const showNoContract = !hasContract && isAdminUser;
          return (
            <Link to={familyDetailsPath}>
              <StyledDashboardAdminReferralCommunityTile
                key={client.name}
                community={community}
                stage={client.stage}
                referralSentAt={client.createdAt}
                showHasContract={showHasContract}
                showNoContract={showNoContract}
              />
            </Link>
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
