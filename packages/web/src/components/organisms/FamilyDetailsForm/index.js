import React, { Component } from 'react';
import { func, bool, string, object, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { apiUrl } from 'sly/web/config';
import { size, palette } from 'sly/common/components/themes';
import { columnWidth } from 'sly/web/components/themes';
import userPropType from 'sly/common/propTypes/user';
import clientPropType from 'sly/common/propTypes/client';
import pad from 'sly/web/components/helpers/pad';
import { phoneParser, phoneFormatter } from 'sly/web/services/helpers/phone';
import Role from 'sly/web/components/common/Role';
import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import {
  SOURCE_OPTIONS,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_REJECTED,
  FAMILY_STAGE_LOST,
  FAMILY_STATUS_ON_PAUSE,
  FAMILY_STATUS_LONG_TERM,
} from 'sly/web/constants/familyDetails';
import { Block, Button, Label } from 'sly/common/components/atoms';
import FamilyMetaDataSummaryBox from 'sly/web/components/molecules/FamilyMetaDataSummaryBox';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import { textAlign } from 'sly/web/components/helpers/text';

const showSummaryStages = [FAMILY_STAGE_WON, FAMILY_STAGE_REJECTED, FAMILY_STAGE_LOST];
const showSummaryStatuses = [FAMILY_STATUS_ON_PAUSE, FAMILY_STATUS_LONG_TERM];

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = styled.form``;
Form.displayName = 'Form';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('spacing.small')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const FormScrollSection = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    max-height: calc(100vh - 240px);
    overflow-y: auto;
  }
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

const StyledFamilyMetaDataSummaryBox = pad(styled(FamilyMetaDataSummaryBox)`
  flex: 1;
`);

// const contactPreferenceOptionsList = [{ value: 'sms', label: 'SMS' }, { value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }];

const additionalMDOptions = [{ value: 'PhoneConnect', label: 'PhoneConnect' },
  { value: 'EmailOnly', label: 'EmailOnly' },
  { value: 'WarmTransfer', label: 'WarmTransfer' },
  { value: 'WarmTransferVM', label: 'WarmTransferVM' },
  { value: 'NoAgent', label: 'NoAgent' },
  { value: 'ReferralSent', label: 'ReferralSent' },
  { value: 'HomeCareOnline', label: 'HomeCareOnline' },
  { value: 'HomeCarePhone', label: 'HomeCarePhone' },
];


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
    careServices: arrayOf(string).isRequired,
    mobilityLevels: arrayOf(string).isRequired,
    communityTypes: arrayOf(string).isRequired,
    preferredLocation: string,
    assignedTos: arrayOf(userPropType).isRequired,
    isAgentUser: bool,
    isAgentProUser: bool,
    isWon: bool,
    client: clientPropType.isRequired,
    onEditStageDetailsClick: func,
    onEditStatusDetailsClick: func,
  };

  handleLookingForChange = (event, value) => {
    const { change, initialValues } = this.props;
    if (value === 'Self') {
      const { name } = initialValues;
      change('residentName', name);
    }
  }

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
      handleSubmit, submitting, invalid, accepted, initialValues, lookingFor, isAgentUser, isAgentProUser,
      gender, timeToMove, monthlyBudget, roomTypes, communityTypes, mobilityLevels, careServices, canEditFamilyDetails, assignedTos,
      client, onEditStageDetailsClick, onEditStatusDetailsClick,
    } = this.props;
    const { stage, status } = client;
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
    const roomPreferenceOptions = roomTypes.map(i => ({ value: i, label: i }));
    const mobilityLevelOptions = mobilityLevels.map(i => ({ value: i, label: i }));
    const adls = careServices.map(i => ({ value: i, label: i }));
    const communityCareTypeOptions = communityTypes.map(i => ({ value: i, label: i }));
    const assignedToOptions = assignedTos.map(i => <option key={i.id} value={i.id}>{i.name}</option>);
    const tagColumn = { typeInfo: { api: `${apiUrl}/v0/platform/tags?filter[name]=` }, value: 'tag.name' };
    const medicaidOptions = [{ label: '', value: true }];
    const sourceOptions = SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>);
    const showStageSummary = showSummaryStages.includes(stage);
    const showStatusSummary = showSummaryStatuses.includes(status);

    return (
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
          {!canEditFamilyDetails &&
          <Warning size="caption">
            First update to a <strong>Connected Stage</strong> to edit this family’s details.
          </Warning>
          }
          <Role is={PLATFORM_ADMIN_ROLE}>
            <FormSection>
              <FormSectionHeading weight="medium">Metadata</FormSectionHeading>
              {showStageSummary &&
                <TwoColumnWrapper>
                  <StyledLabel>{stage} details</StyledLabel>
                  <StyledFamilyMetaDataSummaryBox client={client} onEditClick={onEditStageDetailsClick} />
                </TwoColumnWrapper>
              }
              {showStatusSummary &&
                <TwoColumnWrapper>
                  <StyledLabel>{status} status details</StyledLabel>
                  <StyledFamilyMetaDataSummaryBox mode="status" client={client} onEditClick={onEditStatusDetailsClick} />
                </TwoColumnWrapper>
              }
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
                name="tags"
                label="Tags"
                type="autocomplete"
                readOnly={!canEditFamilyDetails}
                component={ReduxField}
                wideWidth
                column={tagColumn}
                isMulti
              />
              <Field
                name="additionalMetadata"
                type="checkbox"
                label="Additional Attributes"
                component={ReduxField}
                options={additionalMDOptions}
                wideWidth
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
              disabled={!accepted && !canEditFamilyDetails}
              hideValue={!accepted && !canEditFamilyDetails}
              placeholder={!accepted && !canEditFamilyDetails ? 'Accept family to view' : null}
              component={ReduxField}
              wideWidth
            />
            <Field
              name="phone"
              label="Contact Phone"
              readOnly={!canEditFamilyDetails}
              disabled={!accepted && !canEditFamilyDetails}
              hideValue={!accepted && !canEditFamilyDetails}
              placeholder={!accepted && !canEditFamilyDetails ? 'Accept family to view' : null}
              parse={phoneParser}
              format={phoneFormatter}
              component={ReduxField}
              wideWidth
            />
            <PaddedTwoColumnWrapper verticalCenter>
              <StyledLabel>Preferred location</StyledLabel>
              <StyledSearchBoxContainer
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
            <Role is={PLATFORM_ADMIN_ROLE}>
              <>
                {!isAgentUser && <Field
                  name="referralSource"
                  label="Referral Source"
                  type="select"
                  component={ReduxField}
                  wideWidth
                >
                  <option>Select an option</option>
                  {sourceOptions}
                </Field>
                }
                <Field
                  name="medicaid"
                  label="Qualifies for Medicaid"
                  type="checkbox"
                  component={ReduxField}
                  options={medicaidOptions}
                  wideWidth
                />
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
              </>
            </Role>
            {isAgentProUser &&
              <Field
                name="referralSource"
                label="Referral Source"
                type="text"
                component={ReduxField}
                wideWidth
              />
            }
            <Field
              name="slyMessage"
              label="Message"
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
              onChange={this.handleLookingForChange}
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
            <FormSectionHeading weight="medium">Search Preferences</FormSectionHeading>
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
            <Field
              name="communityCareType"
              label="Community type"
              type="checkbox"
              component={ReduxField}
              options={communityCareTypeOptions}
              wideWidth
            />
            <Field
              name="roomPreference"
              label="Room type"
              type="checkbox"
              component={ReduxField}
              options={roomPreferenceOptions}
              wideWidth
            />
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
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">Care Needs</FormSectionHeading>
            <Field
              name="adls"
              label="ADLs"
              type="checkbox"
              component={ReduxField}
              options={adls}
              wideWidth
            />
            <Field
              name="mobilityLevel"
              label="Level of mobility"
              type="checkbox"
              component={ReduxField}
              options={mobilityLevelOptions}
              wideWidth
            />
          </FormSection>
        </FormScrollSection>
        {(accepted || canEditFamilyDetails) &&
          <FormBottomSection>
            <StyledButton type="submit" disabled={invalid || submitting}>
              Save changes
            </StyledButton>
          </FormBottomSection>
        }
      </Form>
    );
  }
}

export default FamilyDetailsForm;
