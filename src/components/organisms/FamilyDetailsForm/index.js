import React, { Component } from 'react';
import { func, bool, string, object, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, columnWidth } from 'sly/components/themes';
import userPropType from 'sly/propTypes/user';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import Role from 'sly/components/common/Role';
import { Block, Button, Label } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = styled.form``;
Form.displayName = 'Form';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const FormScrollSection = styled.div`
  max-height: calc(100vh - 240px);
  overflow-y: auto;
`;
const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: ${ifProp('verticalCenter', 'center', 'initial')};
  }
`;

const StyledLabel = textAlign(styled(Label)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${size('tabletLayout.col2')};
  }
`, 'left');

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');
IntroInfo.displayName = 'IntroInfo';

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex: 0 0 ${size('tabletLayout.col3')};
  }
`;

const PaddedTwoColumnWrapper = pad(TwoColumnWrapper, 'large');

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

// const contactPreferenceOptionsList = [{ value: 'sms', label: 'SMS' }, { value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }];

const additionalMDOptions = [{ value: 'PhoneConnect', label: 'PhoneConnect' },
  { value: 'EmailOnly', label: 'EmailOnly' },
  { value: 'WarmTransfer', label: 'WarmTransfer' },
  { value: 'WarmTransferVM', label: 'WarmTransferVM' },
  { value: 'NoAgent', label: 'NoAgent' },
  { value: 'ReferralSent', label: 'ReferralSent' },
];

// const tagsOptions = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];
class FamilyDetailsForm extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool,
    pristine: bool,
    invalid: bool,
    accepted: bool,
    canEditFamilyDetails: bool,
    change: func,
    onLocationChange: func,
    initialValues: object,
    lookingFor: arrayOf(string).isRequired,
    gender: arrayOf(string).isRequired,
    timeToMove: arrayOf(string).isRequired,
    monthlyBudget: arrayOf(string).isRequired,
    roomTypes: arrayOf(string).isRequired,
    careLevels: arrayOf(string).isRequired,
    communityTypes: arrayOf(string).isRequired,
    preferredLocation: string,
    assignedTos: arrayOf(userPropType).isRequired,
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('preferredLocation', value.formatted_address);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  render() {
    const { handleLocationChange } = this;
    const {
      handleSubmit, submitting, invalid, accepted, initialValues, lookingFor,
      gender, timeToMove, monthlyBudget, roomTypes, communityTypes, careLevels, canEditFamilyDetails, assignedTos,
    } = this.props;
    let { preferredLocation } = this.props;
    if (initialValues && !preferredLocation) {
      ({ preferredLocation } = initialValues);
    }

    // const lookingForOptions = lookingFor.map(i => ({ label: i, value: i }));
    // const femaleOptions = gender.map(i => ({ label: i, value: i }));
    // const timeToMoveOptions = timeToMove.map(i => ({ label: i, value: i }));
    // const monthlyBudgetOptions = monthlyBudget.map(i => ({ label: i, value: i }));

    const lookingForOptions = lookingFor.map(i => <option key={i} value={i}>{i}</option>);
    const femaleOptions = gender.map(i => <option key={i} value={i}>{i}</option>);
    const timeToMoveOptions = timeToMove.map(i => <option key={i} value={i}>{i}</option>);
    const monthlyBudgetOptions = monthlyBudget.map(i => <option key={i} value={i}>{i}</option>);
    const roomPreferenceOptions = roomTypes.map(i => <option key={i} value={i}>{i}</option>);
    const mobilityLevelOptions = careLevels.map(i => <option key={i} value={i}>{i}</option>);
    const communityCareTypeOptions = communityTypes.map(i => <option key={i} value={i}>{i}</option>);
    const assignedToOptions = assignedTos.map(i => <option key={i.id} value={i.id}>{i.name}</option>);
    const tagColumn = { typeInfo: { api: '/v0/platform/tags?filter[name]=' }, value: 'tag.name' };
    // const medicaidOptions = [{ label: 'Yes', value: true }];
    return (
      <div>
        {!canEditFamilyDetails &&
          <Warning size="caption">
            First update to a <strong>Connected Stage</strong> to edit this family’s details.
          </Warning>
        }
        <Form onSubmit={handleSubmit}>
          <FormScrollSection>
            <Role is={PLATFORM_ADMIN_ROLE}>
              <FormSection>
                <FormSectionHeading weight="medium">Metadata</FormSectionHeading>
                <Field
                  name="assignedTo"
                  label="Assigned to"
                  type="select"
                  placeholder="Select an option"
                  component={ReduxField}
                  wideWidth
                >
                  <option value="" disabled>Select</option>
                  {assignedToOptions}
                </Field>
                <Field
                  name="additionalMetadata"
                  type="checkbox"
                  label="Additional Attributes"
                  component={ReduxField}
                  options={additionalMDOptions}
                  wideWidth
                />
                <Field
                  name="tags"
                  label="Tags"
                  type="autocomplete"
                  readOnly={!canEditFamilyDetails}
                  component={ReduxField}
                  wideWidth
                  column={tagColumn}
                  isMulti
                />
              </FormSection>
            </Role>
            <FormSection>
              <FormSectionHeading weight="medium">Primary</FormSectionHeading>
              <Field
                name="name"
                label="Contact name"
                type="text"
                readOnly={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              />
              <Field
                name="email"
                label="Contact Email"
                type="email"
                readOnly={!canEditFamilyDetails}
                disabled={!accepted}
                hideValue={!accepted}
                placeholder={!accepted ? 'Accept family to view' : null}
                component={ReduxField}
                wideWidth
              />
              <Field
                name="phone"
                label="Contact Phone"
                readOnly={!canEditFamilyDetails}
                disabled={!accepted}
                hideValue={!accepted}
                placeholder={!accepted ? 'Accept family to view' : null}
                parse={phoneParser}
                format={phoneFormatter}
                component={ReduxField}
                wideWidth
              />
              <PaddedTwoColumnWrapper verticalCenter>
                <StyledLabel>Preferred location</StyledLabel>
                <StyledSearchBoxContainer
                  allowOnlySelectionFromSuggestions
                  clearLocationOnBlur={false}
                  onLocationSearch={handleLocationChange}
                  address={preferredLocation}
                  readOnly={!canEditFamilyDetails}
                />
                <Field
                  name="preferredLocation"
                  type="hidden"
                  component={ReduxField}
                />
              </PaddedTwoColumnWrapper>
              {/* todo: @pranesh fixme
              <Field
                name="medicaid"
                label="Qualifies for Medicaid"
                type="checkbox"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              />
              */
              }
              <Field
                name="slyAgentMessage"
                label="Summary for Agent"
                type="textarea"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              />
              <Field
                name="slyCommunityMessage"
                label="Summary for Community"
                type="textarea"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              />
              <Field
                name="slyMessage"
                label="Seniorly Introduction"
                type="textarea"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              />
              {/* <Field
                name="contactPreferences"
                type="checkbox"
                label="Contact Preference"
                component={ReduxField}
                options={contactPreferenceOptionsList}
                wideWidth
              />
              <Field
                name="timePreference"
                label="Contact Time Preference"
                type="text"
                readOnly={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              /> */}
            </FormSection>
            <FormSection>
              <FormSectionHeading weight="medium">Resident Info</FormSectionHeading>
              <Field
                name="lookingFor"
                label="Looking for"
                type="select"
                placeholder="Select an option"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              >
                <option value="" disabled>Select</option>
                {lookingForOptions}
              </Field>
              <Field
                name="residentName"
                label="Resident name"
                type="text"
                readOnly={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              />
              <Field
                name="gender"
                label="Gender"
                type="select"
                placeholder="Select an option"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              >
                <option value="" disabled>Select</option>
                {femaleOptions}
              </Field>
              <Field
                name="age"
                label="Age"
                type="number"
                readOnly={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              />

            </FormSection>
            <FormSection>
              <FormSectionHeading weight="medium">Care Needs</FormSectionHeading>
              <Field
                name="mobilityLevel"
                label="Level of mobility"
                type="select"
                placeholder="Select an option"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              >
                <option value="" disabled>Select</option>
                {mobilityLevelOptions}
              </Field>
            </FormSection>
            <FormSection>
              <FormSectionHeading weight="medium">Search Preferences</FormSectionHeading>
              <Field
                name="roomPreference"
                label="Room type"
                type="select"
                placeholder="Select an option"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              >
                <option value="" disabled>Select</option>
                {roomPreferenceOptions}
              </Field>
              <Field
                name="communityCareType"
                label="Community type"
                type="select"
                placeholder="Select an option"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              >
                <option value="" disabled>Select</option>
                {communityCareTypeOptions}
              </Field>
              <Field
                name="budget"
                label="Monthly budget"
                type="select"
                placeholder="Select an option"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              >
                <option value="" disabled>Select</option>
                {monthlyBudgetOptions}
              </Field>
              <Field
                name="timeToMove"
                label="Time to move"
                type="select"
                placeholder="Select an option"
                disabled={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
              >
                <option value="" disabled>Select</option>
                {timeToMoveOptions}
              </Field>
            </FormSection>
          </FormScrollSection>
          {accepted &&
            <FormBottomSection>
              <StyledButton type="submit" disabled={invalid || submitting}>
                Save changes
              </StyledButton>
            </FormBottomSection>
          }
        </Form>
      </div>
    );
  }
}

export default FamilyDetailsForm;
