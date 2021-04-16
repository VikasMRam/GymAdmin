import React, { Component } from 'react';
import { func, bool, string, object, arrayOf } from 'prop-types';
import { Field } from 'redux-form';

import { apiUrl } from 'sly/web/config';
import userPropType from 'sly/common/propTypes/user';
import clientPropType from 'sly/common/propTypes/client';
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
import { Button } from 'sly/web/components/atoms';
import FamilyMetaDataSummaryBox from 'sly/web/components/molecules/FamilyMetaDataSummaryBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import {
  Section,
  SectionActions,
  SectionForm,
  SectionHeader, Warning,
} from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import FieldRow from 'sly/web/components/molecules/FieldRow';

const showSummaryStages = [FAMILY_STAGE_WON, FAMILY_STAGE_REJECTED, FAMILY_STAGE_LOST];
const showSummaryStatuses = [FAMILY_STATUS_ON_PAUSE, FAMILY_STATUS_LONG_TERM];

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


export default class FamilyDetailsForm extends Component {
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
    change('preferredLocation', value.displayText);
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
    const tagColumn = { typeInfo: { api: `${apiUrl}/platform/tags?filter[category]=Clients&filter[name]=` }, value: 'tag.name' };
    const medicaidOptions = [{ label: '', value: true }];
    const sourceOptions = SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>);
    const showStageSummary = showSummaryStages.includes(stage);
    const showStatusSummary = showSummaryStatuses.includes(status);

    return (
      <Section
        as="form"
        onSubmit={handleSubmit}
      >
        <SectionHeader>
          Details
        </SectionHeader>

        {!canEditFamilyDetails &&
          <Warning size="caption">
            First update to a <strong>Connected Stage</strong> to edit this family’s details.
          </Warning>
        }

        <Role is={PLATFORM_ADMIN_ROLE}>
          <SectionForm heading="Metadata">
            {showStageSummary && (
              <FieldRow label={`${stage} details`}>
                <FamilyMetaDataSummaryBox client={client} onEditClick={onEditStageDetailsClick} />
              </FieldRow>
            )}
            {showStatusSummary && (
              <FieldRow label={`${status} status details`}>
                <FamilyMetaDataSummaryBox mode="status" client={client} onEditClick={onEditStatusDetailsClick} />
              </FieldRow>
            )}
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
              label="Additional attributes"
              component={ReduxField}
              options={additionalMDOptions}
              wideWidth
            />
          </SectionForm>
        </Role>

        <SectionForm label="Primary">
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
            label="Contact email"
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
            label="Contact phone"
            readOnly={!canEditFamilyDetails}
            disabled={!accepted && !canEditFamilyDetails}
            hideValue={!accepted && !canEditFamilyDetails}
            placeholder={!accepted && !canEditFamilyDetails ? 'Accept family to view' : null}
            parse={phoneParser}
            format={phoneFormatter}
            component={ReduxField}
            wideWidth
          />
          <FieldRow label="Preferred location">
            <SearchBoxContainer
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
          </FieldRow>
          <Role is={PLATFORM_ADMIN_ROLE}>
            {!isAgentUser &&
              <Field
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
        </SectionForm>

        <SectionForm label="Resident info">
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
        </SectionForm>

        <SectionForm label="Search preferences">
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
        </SectionForm>

        <SectionForm label="Care needs">
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
        </SectionForm>

        <SectionActions>
          <Button type="submit" disabled={!(accepted || canEditFamilyDetails) || invalid || submitting}>
            Save changes
          </Button>
        </SectionActions>
      </Section>
    );
  }
}
