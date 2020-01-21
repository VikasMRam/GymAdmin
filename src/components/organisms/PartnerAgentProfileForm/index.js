import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import HeadingBoxSection from 'sly/components/molecules/HeadingBoxSection';
import { Block, Hr, Button } from 'sly/components/atoms';
// import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';

const StyledForm = styled.form`
  > section {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const BottomWrapper = styled.div`
  margin-left: -${size('spacing.xLarge')};
  margin-right: -${size('spacing.xLarge')};
  text-align: right;
`;

const BottomButton = styled(Button)`
  margin-right: ${size('spacing.xLarge')};
`;

const AGENT_REGION_OPTIONS = [
  'Pacific North',
  'Pacific South',
  'Central North',
  'Central South',
  'North East',
  'South East',
  'Florida',
];
const AGENT_STATUS_OPTIONS = [
  { value: -2, label: 'Deleted' },
  { value: -1, label: 'Pending' },
  { value: 0, label: 'Approved' },
  { value: 1, label: 'Live' },
];

const agentRegionOptions = AGENT_REGION_OPTIONS.map(i => <option key={i} value={i}>{i}</option>);
const agentStatusOptions = AGENT_STATUS_OPTIONS.map(i => <option key={i.value} value={i.value}>{i.label}</option>);

const PartnerAgentProfileForm = ({ buttonText, error, handleSubmit, pristine, submitting, invalid,hasNoBodyPadding }) => (
  <StyledForm onSubmit={handleSubmit}>
    <HeadingBoxSection heading="Area Served" hasNoBodyPadding={hasNoBodyPadding}>
      <Field
        name="adminRegion"
        label="Region"
        type="select"
        component={ReduxField}
        wideWidth
      >
        <option value="" disabled>Select an option</option>
        {agentRegionOptions}
      </Field>
      <Field
        name="zipcodesServed"
        label="Zipcodes Served"
        type="textarea"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
    </HeadingBoxSection>
    <HeadingBoxSection heading="Profile" hasNoBodyPadding={hasNoBodyPadding}>
      <Field
        name="bio"
        label="Bio"
        type="textarea"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
      <Field
        name="parentCompany"
        label="Parent Company"
        type="text"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
      <Field
        name="displayName"
        label="Display name"
        type="text"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
      <Field
        name="cv"
        label="Rich Text Bio"
        type="textarea"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
      <Field
        name="imageCaption"
        label="Image Caption"
        type="text"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
      <Field
        name="chosenReview"
        label="Chosen Review"
        type="text"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
      <Field
        name="vacation"
        label="Vacation"
        type="daterange"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
    </HeadingBoxSection>
    <HeadingBoxSection heading="Admin" hasNoBodyPadding={hasNoBodyPadding}>
      <Field
        name="status"
        label="Status"
        type="select"
        component={ReduxField}
        wideWidth
      >
        <option value="" disabled>Select an option</option>
        {agentStatusOptions}
      </Field>
      <Field
        name="adminNotes"
        label="Admin Notes"
        type="textarea"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
    </HeadingBoxSection>
    {error && <Block palette="danger">{error}</Block>}
    {buttonText &&
      <BottomWrapper>
        <Hr />
        <BottomButton type="submit" disabled={invalid || pristine || submitting}>{buttonText}</BottomButton>
      </BottomWrapper>
    }
  </StyledForm>
);

export default PartnerAgentProfileForm;
