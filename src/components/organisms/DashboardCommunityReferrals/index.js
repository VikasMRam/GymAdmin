import React, { Fragment } from 'react';
import { func, arrayOf, object } from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import { Block, Button, Link } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, FAMILY_DETAILS } from 'sly/constants/dashboardAppPaths';

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
  communitiesInterested, communitiesInterestedIdsMap, childrenClients, childrenClientCommunityIdsMap, onSubmit, setSelectedCommunity,
}) => {
  const title = 'FAMILY INTERESTED IN COMMUNITY';
  return (
    <Fragment>
      <TopWrapper>
        <Block size="subtitle">Communities</Block>
        <SendNewReferralButton onClick={() => onSubmit()}>Send a new referral</SendNewReferralButton>
      </TopWrapper>
      <CommunitiesWrapper>
        {communitiesInterested.map((community) => {
            const client = childrenClientCommunityIdsMap[community.id];
            const { id, stage, createdAt } = client;
            const props = {
              key: community.name,
              community,
              title,
            };
            if (client) {
              const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });
              return <Link to={familyDetailsPath}><StyledDashboardAdminReferralCommunityTile {...props} stage={stage} referralSentAt={createdAt} /></Link>;
            }
            return <StyledDashboardAdminReferralCommunityTile {...props} actionText="Send Referral" actionClick={() => setSelectedCommunity(community)} />;
          })
        }
        {childrenClients.map((client) => {
          const community = communitiesInterestedIdsMap[client.provider.id];
          if (community) {
            return null;
          }
          return <StyledDashboardAdminReferralCommunityTile key={client.name} community={client.provider} stage={client.stage} referralSentAt={client.createdAt} />;
          })
        }
      </CommunitiesWrapper>
    </Fragment>
  );
};

DashboardCommunityReferrals.propTypes = {
  setSelectedCommunity: func,
  onSubmit: func,
  communitiesInterested: arrayOf(adminCommunityPropType),
  childrenClients: arrayOf(adminCommunityPropType),
  childrenClientCommunityIdsMap: object,
  communitiesInterestedIdsMap: object,
};

export default DashboardCommunityReferrals;
