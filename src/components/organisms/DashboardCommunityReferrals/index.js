import React, { Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import { Block, Button } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';

const TopWrapper = styled.div`
  display: flex;
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const CommunitiesWrapper = styled.div`
  padding: ${size('spacing.large')};
`;

const SendNewReferralButton = styled(Button)`
  margin-left: auto;
`;

const StyledDashboardAdminReferralCommunityTile = pad(DashboardAdminReferralCommunityTile);

const DashboardCommunityReferrals = ({
  handleCommunitySearch, communitiesInterested, sendNewReferral, onSubmit,
}) => {
  // if (communities.length > 0) {
  //   const commList = communities.map(e => <DashboardAdminReferralCommunityTile key={e.name} community={e} sendReferral={sendReferral} />);
  //   return (
  //     <Fragment>
  //       <DashboardCommunityAgentSearchBox handleSubmit={handleCommunitySearch} />
  //       {communities && communities.length > 0 && commList
  //       }
  //     </Fragment>
  //   );
  // }
  // return (
  //   <EmptyWrapper>
  //     <NoReferralBlock>You haven’t sent any referrals to any communities yet.</NoReferralBlock>
  //     <Button onClick={() => onSubmit()}>Send a new referral</Button>
  //   </EmptyWrapper>
  // );
  const title = 'FAMILY INTERESTED IN COMMUNITY';
  return (
    <Fragment>
      <TopWrapper>
        <Block size="subtitle">Communities</Block>
        <SendNewReferralButton onClick={() => onSubmit()}>Send a new referral</SendNewReferralButton>
      </TopWrapper>
      <CommunitiesWrapper>
        {communitiesInterested.map(e => <StyledDashboardAdminReferralCommunityTile key={e.name} community={e} title={title} actionText="Send Referral" actionClick={() => sendNewReferral(e)} />)}
      </CommunitiesWrapper>
    </Fragment>
  );
};

DashboardCommunityReferrals.propTypes = {
  handleCommunitySearch: func,
  sendNewReferral: func,
  onSubmit: func,
  communitiesInterested: arrayOf(adminCommunityPropType),
};

export default DashboardCommunityReferrals;
