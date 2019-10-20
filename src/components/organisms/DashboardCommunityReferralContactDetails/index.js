import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Block, Hr, Button } from 'sly/components/atoms';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import pad from 'sly/components/helpers/pad';
import { adminCommunityPropType } from 'sly/propTypes/community';
import ReduxField from 'sly/components/organisms/ReduxField';
import { getHasContract } from 'sly/services/helpers/communityReferral';

const SendReferralTitleBlock = pad(Block);

const Form = styled.form`
padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const StyledDashboardAdminReferralCommunityTile = styled(DashboardAdminReferralCommunityTile)`
  margin-bottom: ${size('spacing.large')};
`;

const DashboardCommunityReferralContactDetails = ({ community, isAdminUser, handleSubmit, onChangeCommunity }) => {
  const hasContract = getHasContract(community);
  const showHasContract = hasContract && isAdminUser;
  const showNoContract = !hasContract && isAdminUser;
  const props = {
    community,
    showHasContract,
    showNoContract,
  };
  return (
    <Form onSubmit={handleSubmit} name="DashboardCommunityReferralContactDetailsForm">
      <SendReferralTitleBlock size="subtitle">Send referral to a community</SendReferralTitleBlock>
      <Hr size="large" />
      <StyledDashboardAdminReferralCommunityTile {...props} actionText="Change Community" actionClick={() => onChangeCommunity()} />
      <Field name="name" label="Community contact name" type="text" placeholder="Enter Community contact name" component={ReduxField} />
      <Field name="email" label="Community email" type="text" placeholder="Enter Community email" component={ReduxField} />
      <Field name="slyMessage" label="Message" type="textarea" placeholder="Enter Message" component={ReduxField} />
      <Button type="submit">Send Referral</Button>
    </Form>
  );
};

DashboardCommunityReferralContactDetails.propTypes = {
  community: adminCommunityPropType,
  isAdminUser: bool,
  handleSubmit: func,
  onChangeCommunity: func,
};

export default DashboardCommunityReferralContactDetails;
