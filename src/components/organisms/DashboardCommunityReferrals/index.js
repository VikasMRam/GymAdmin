import React, { Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import { Block, Button } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';

const EmptyWrapper = styled.div`
  padding: ${size('spacing.xxxLarge')} ${size('spacing.large')};
  text-align: center;
`;

const NoReferralBlock = pad(Block);

const DashboardCommunityReferrals = ({
  handleCommunitySearch, communities, sendReferral, nextStep,
}) => {
  if (communities.length > 0) {
    const commList = communities.map(e => <DashboardAdminReferralCommunityTile key={e.name} community={e} sendReferral={sendReferral} />);
    return (
      <Fragment>
        <DashboardCommunityAgentSearchBox handleSubmit={handleCommunitySearch} />
        {communities && communities.length > 0 && commList
        }
      </Fragment>
    );
  }
  return (
    <EmptyWrapper>
      <NoReferralBlock>You haven’t sent any referrals to any communities yet.</NoReferralBlock>
      <Button onClick={() => nextStep()}>Send a new referral</Button>
    </EmptyWrapper>
  );
};

DashboardCommunityReferrals.propTypes = {
  handleCommunitySearch: func,
  sendReferral: func,
  nextStep: func,
  communities: arrayOf(adminCommunityPropType),
};

export default DashboardCommunityReferrals;
