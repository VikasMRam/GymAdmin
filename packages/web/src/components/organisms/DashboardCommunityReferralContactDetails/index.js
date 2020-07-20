import React from 'react';
import styled from 'styled-components';
import { func, bool, object } from 'prop-types';
import { Field } from 'redux-form';

import { size } from 'sly/web/components/themes';
import { Block, Hr, Button } from 'sly/web/components/atoms';
import DashboardAdminReferralCommunityTile from 'sly/web/components/organisms/DashboardAdminReferralCommunityTile';
import pad from 'sly/web/components/helpers/pad';
import { adminCommunityPropType } from 'sly/common/propTypes/community';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { FAMILIES_INTERESTED_COMMUNITY_TITLE } from 'sly/web/constants/referrals';

const SendReferralTitleBlock = pad(Block);

const Form = styled.form`
padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const StyledDashboardAdminReferralCommunityTile = styled(DashboardAdminReferralCommunityTile)`
  margin-bottom: ${size('spacing.large')};
`;

const DashboardCommunityReferralContactDetails = ({ community, communitiesInterestedIdsMap, isAdminUser, handleSubmit, onChangeCommunity }) => {
  let communityTileTitle = null;
  if (communitiesInterestedIdsMap[community.id]) {
    communityTileTitle = FAMILIES_INTERESTED_COMMUNITY_TITLE;
  }
  return (
    <Form onSubmit={handleSubmit} name="DashboardCommunityReferralContactDetailsForm">
      <SendReferralTitleBlock size="subtitle">Send referral to a community</SendReferralTitleBlock>
      <Hr size="large" />
      <StyledDashboardAdminReferralCommunityTile community={community} title={communityTileTitle} isAdminUser={isAdminUser} actionText="Change Community" actionClick={() => onChangeCommunity()} />
      <Field name="name" label="Community contact name" type="text" placeholder="Enter Community contact name" component={ReduxField} />
      <Field name="email" label="Community email" type="text" placeholder="Enter Community email" component={ReduxField} />
      <Field name="slyMessage" label="Message" type="textarea" placeholder="Enter Message" component={ReduxField} />
      <Button type="submit">Send Referral</Button>
    </Form>
  );
};

DashboardCommunityReferralContactDetails.propTypes = {
  community: adminCommunityPropType,
  communitiesInterestedIdsMap: object,
  isAdminUser: bool,
  handleSubmit: func,
  onChangeCommunity: func,
};

export default DashboardCommunityReferralContactDetails;
