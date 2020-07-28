import React from 'react';
import styled from 'styled-components';
import { func, object } from 'prop-types';
import { Field } from 'redux-form';

import { size } from 'sly/common/components/themes';
import { Block, Hr, Button } from 'sly/web/components/atoms';
import DashboardAdminReferralAgentTile from 'sly/web/components/organisms/DashboardAdminReferralAgentTile';
import pad from 'sly/web/components/helpers/pad';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const SendReferralTitleBlock = pad(Block);

const Form = styled.form`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const StyledDashboardAdminReferralAgentTile = pad(DashboardAdminReferralAgentTile);

const DashboardAgentReferralContactDetails = ({
  agent, handleSubmit, onChangeAgent,
}) => (
  <Form onSubmit={handleSubmit} name="DashboardAgentReferralContactDetailsForm">
    <SendReferralTitleBlock size="subtitle">Send referral to a agent</SendReferralTitleBlock>
    <Hr size="large" />
    <StyledDashboardAdminReferralAgentTile agent={agent} bottomActionText="Change Agent" bottomActionOnClick={onChangeAgent} />
    <Field name="name" label="Agent contact name" type="text" placeholder="Enter Agent contact name" component={ReduxField} />
    <Field name="email" label="Agent email" type="text" placeholder="Enter Agent email" component={ReduxField} />
    <Field name="slyMessage" label="Message" type="textarea" placeholder="Enter Message" component={ReduxField} />
    <Button type="submit">Send Referral</Button>
  </Form>
);

DashboardAgentReferralContactDetails.propTypes = {
  agent: object,
  handleSubmit: func,
  onChangeAgent: func,
};

export default DashboardAgentReferralContactDetails;
