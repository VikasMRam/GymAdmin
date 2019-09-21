import React, { Fragment } from 'react';
import { func, arrayOf, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import { Block, Button } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';

const TopWrapper = styled.div`
  display: flex;
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'stroke')};
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
            const props = {
              key: community.name,
              community,
              title,
            };
            if (client) {
              return <StyledDashboardAdminReferralCommunityTile {...props} stage={client.stage} referralSentAt={client.createdAt} />;
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
