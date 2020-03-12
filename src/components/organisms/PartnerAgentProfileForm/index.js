import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { func, string, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Block, Button } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = styled.form`
  background-color: ${palette('white.base')};
`;

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const FormScrollSection = styled.div`
  max-height: calc(100vh - 160px);
  overflow-y: auto;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    max-height: calc(100vh - 230px);
  }
`;

const FormSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  padding-bottom: 0;
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;
const FormBottomSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')} ${palette('grey', 'filler')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
  }
`;

const FormSectionHeading = pad(Block, 'large');

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

const PartnerAgentProfileForm = ({ buttonText, error, handleSubmit, pristine, submitting, invalid, isSlyAdmin }) => (
  <Form onSubmit={handleSubmit}>
    <FormScrollSection>
      <FormSection>
        <FormSectionHeading weight="medium">Area Served</FormSectionHeading>
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
      </FormSection>
      <FormSection>
        <FormSectionHeading weight="medium">Profile</FormSectionHeading>
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
          type="richtextarea"
          placeholder=""
          component={ReduxField}
          wideWidth
          widthSpacing="tabletLayout.col5"
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
      </FormSection>
      {isSlyAdmin && (
        <FormSection>
          <FormSectionHeading weight="medium">Admin</FormSectionHeading>
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
          <Field
            name="slyScore"
            label="Slyscore"
            type="number"
            placeholder=""
            component={ReduxField}
            wideWidth
          />
          <Field
            name="isPro"
            label="Is Pro"
            type="checkbox"
            placeholder=""
            component={ReduxField}
            wideWidth
            options={[{ label: '', value: true }]}
          />
        </FormSection>
      )}
    </FormScrollSection>
    {error && <Block palette="danger">{error}</Block>}
    {buttonText &&
      <FormBottomSection>
        <StyledButton type="submit" disabled={invalid || pristine || submitting}>
          {buttonText}
        </StyledButton>
      </FormBottomSection>
    }
  </Form>
);

PartnerAgentProfileForm.propTypes = {
  handleSubmit: func.isRequired,
  buttonText: string,
  error: string,
  pristine: bool,
  submitting: bool,
  invalid: bool,
  isSlyAdmin: bool,
};


export default PartnerAgentProfileForm;
