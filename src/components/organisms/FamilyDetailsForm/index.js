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
import { priceFormatter, priceParser } from 'sly/services/helpers/pricing';
import Role from 'sly/components/common/Role';
import { isBeforeNow } from 'sly/services/validation';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import { SOURCE_OPTIONS, ROOM_TYPES } from 'sly/constants/familyDetails';
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

const ReferralAgreementWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: ${size('spacing.large')};
  align-items: baseline;
`;

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

const roomTypeOptions = ROOM_TYPES.map(i => ({ value: i, label: i }));

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
    isAgentUser: bool,
    referralAgreementType: string,
    isWon: bool,
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
      handleSubmit, submitting, invalid, accepted, initialValues, lookingFor, isAgentUser,
      gender, timeToMove, monthlyBudget, roomTypes, communityTypes, careLevels, canEditFamilyDetails, assignedTos,
      referralAgreementType, isWon,
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
    const roomPreferenceOptions = roomTypes.map(i => ({ value: i, label: i }));
    const mobilityLevelOptions = careLevels.map(i => ({ value: i, label: i }));
    const communityCareTypeOptions = communityTypes.map(i => ({ value: i, label: i }));
    const assignedToOptions = assignedTos.map(i => <option key={i.id} value={i.id}>{i.name}</option>);
    const tagColumn = { typeInfo: { api: '/v0/platform/tags?filter[name]=' }, value: 'tag.name' };
    const medicaidOptions = [{ label: '', value: true }];
    const sourceOptions = SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>);

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
                {isWon &&
                  <>
                    <Field
                      name="moveInDate"
                      label="Move-in date"
                      type="date"
                      placeholder="mm/dd/yyyy"
                      component={ReduxField}
                      dateFormat="MM/dd/yyyy"
                      validate={isBeforeNow}
                      wideWidth
                    />
                    <Field
                      name="communityName"
                      label="Community name"
                      type="text"
                      component={ReduxField}
                      wideWidth
                    />
                    <Field
                      name="moveRoomType"
                      label="Room type"
                      type="choice"
                      component={ReduxField}
                      options={roomTypeOptions}
                      wideWidth
                    />
                    <Field
                      name="monthlyFees"
                      label="Monthly fees (rent + care)"
                      type="iconInput"
                      component={ReduxField}
                      parse={priceParser}
                      format={priceFormatter}
                      wideWidth
                    />
                    <ReferralAgreementWrapper>
                      <Label>Community referral agreement</Label>
                      <ReferralAgreementWrapper>
                        <Field
                          name="referralAgreementType"
                          label="Percentage"
                          type="radio"
                          value="percentage"
                          component={ReduxField}
                        />
                        <Field
                          name="referralAgreementType"
                          label="Flat-fee"
                          type="radio"
                          value="flat-fee"
                          component={ReduxField}
                        />
                      </ReferralAgreementWrapper>
                    </ReferralAgreementWrapper>
                    {referralAgreementType &&
                      <ReferralAgreementWrapper>
                        <Field
                          name="referralAgreement"
                          type="iconInput"
                          icon={referralAgreementType === 'percentage' ? 'percentage' : 'dollar'}
                          label={referralAgreementType === 'percentage' ? 'Percent amount' : 'Fee amount'}
                          component={ReduxField}
                          parse={priceParser}
                          format={priceFormatter}
                          wideWidth
                        />
                      </ReferralAgreementWrapper>
                    }
                    <Field
                      name="invoiceNumber"
                      label="Invoice number"
                      type="text"
                      placeholder="0000000"
                      component={ReduxField}
                      wideWidth
                    />
                    <Field
                      name="invoiceAmount"
                      type="iconInput"
                      icon="dollar"
                      label="Invoice amount"
                      placeholder="0.00"
                      component={ReduxField}
                      wideWidth
                    />
                    <Field
                      name="invoicePaid"
                      label="Invoice paid"
                      type="choice"
                      component={ReduxField}
                      options={[
                        { value: 'yes', label: 'yes' },
                        { value: 'no', label: 'no' },
                      ]}
                      wideWidth
                    />
                  </>
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
              {!isAgentUser &&
                <>
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
                </>
              }
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
                name="mobilityLevel"
                label="Level of mobility"
                type="checkbox"
                component={ReduxField}
                options={mobilityLevelOptions}
                wideWidth
              />
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
