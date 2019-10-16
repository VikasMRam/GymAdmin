import React, { Component } from 'react';
import { func, string, arrayOf, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { palette, size } from 'sly/components/themes';
import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/constants/familyDetails';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import Role from 'sly/components/common/Role';
import pad from 'sly/components/helpers/pad';
import { priceFormatter, priceParser } from 'sly/services/helpers/pricing';
import { Block, Span, Label } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const PaddedField = pad(Field, 'xLarge');
PaddedField.displayName = 'PaddedField';

const ReferralAgreementWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: ${size('spacing.large')};
  align-items: baseline;
`;

export default class UpdateFamilyStageForm extends Component {
  static propTypes = {
    handleSubmit: func,
    onCancel: func,
    name: string.isRequired,
    currentStageGroup: string,
    nextStageGroup: string,
    currentStage: string,
    nextStage: string,
    nextAllowedStages: arrayOf(string).isRequired,
    lossReasons: arrayOf(string).isRequired,
    roomTypes: arrayOf(string).isRequired,
    currentLossReason: string,
    change: func.isRequired,
    onLocationChange: func,
    isPaused: bool,
    monthlyFees: string,
    referralAgreement: string,
    referralAgreementType: string,
  };

  static defaultProps = {
    referralAgreement: '',
    monthlyFees: '',
  };

  handleChange = () => {
    const { change } = this.props;
    change('preferredLocation', '');
  };

  handleLocationChange = (value) => {
    const { change, onLocationChange } = this.props;
    change('preferredLocation', value.formatted_address);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  render() {
    const { handleChange, handleLocationChange } = this;
    const {
      handleSubmit, onCancel, name, currentStageGroup, nextStageGroup, currentStage, nextStage, nextAllowedStages, lossReasons,
      currentLossReason, isPaused, referralAgreementType, referralAgreement, monthlyFees, roomTypes, ...props
    } = this.props;

    const NEW_FAMILY_STAGE_ORDERED = { ...FAMILY_STAGE_ORDERED };

    const options = Object.keys(NEW_FAMILY_STAGE_ORDERED).map((sg, ig) => {
      let stages = NEW_FAMILY_STAGE_ORDERED[sg].map((s, i) => nextAllowedStages.indexOf(s) !== -1 && <option disabled={ig === 0 && i === 0} key={s} value={s}>{s}</option>);
      stages = stages.filter(s => s);

      if (stages.length) {
        return (
          <optgroup label={sg} key={sg}>
            {stages}
          </optgroup>
        );
      }
      return null;
    });
    const roomTypeOptions = roomTypes.map(t => <option key={t} value={t}>{t}</option>);
    const lossReasonOptions = lossReasons.map(reason => <option key={reason} value={reason}>{reason}</option>);
    const stageGroupChanged = nextStageGroup && currentStageGroup !== nextStageGroup;
    const stageChanged = currentStage !== nextStage;
    const StageField = stageGroupChanged ? Field : PaddedField;

    return (
      <ThreeSectionFormTemplate
        {...props}
        hasCancel
        onCancelClick={onCancel}
        hasSubmit
        onSubmit={handleSubmit}
        heading={`Updating ${name}'s Stage`}
        submitButtonText="Update"
      >
        <StageField
          name="stage"
          label="Stage"
          type="select"
          component={ReduxField}
        >
          <option value="" disabled>Select a stage</option>
          {options}
        </StageField>
        {stageGroupChanged && (!isPaused || (isPaused && stageChanged)) &&
          <Warning size="caption">
            Updating to this stage will move this family from <strong>{currentStageGroup}</strong> to <strong>{nextStageGroup}</strong>.
          </Warning>
        }
        {stageChanged && !stageGroupChanged && isPaused &&
          <Warning size="caption">
            Updating this family&apos;s stage will remove them from being <strong>Paused</strong>.
          </Warning>
        }
        {nextStage !== FAMILY_STAGE_WON && nextStage !== FAMILY_STAGE_LOST &&
          <Field
            type="textarea"
            rows={3}
            name="note"
            label="Add a note"
            placeholder="Add a note on why you are updating this family's stage..."
            component={ReduxField}
          />
        }
        {nextStage === FAMILY_STAGE_WON &&
          <Field
            name="moveInDate"
            label={<span>Move-In date<Span palette="danger">*</Span></span>}
            type="date"
            placeholder="mm/dd/yyyy"
            component={ReduxField}
            dateFormat="MM/dd/yyyy"
          />
        }
        {nextStage === FAMILY_STAGE_WON &&
          <Field
            name="communityName"
            label={<span>Community name<Span palette="danger">*</Span></span>}
            type="text"
            component={ReduxField}
          />
        }
        {nextStage === FAMILY_STAGE_WON &&
          <Field
            name="roomType"
            label="Room type"
            type="select"
            component={ReduxField}
          >
            <option value="" disabled>Select an option</option>
            {roomTypeOptions}
          </Field>
        }
        {nextStage === FAMILY_STAGE_WON &&
          <Field
            name="monthlyFees"
            label={<span>Resident&apos;s monthly fees (rent + care)<Span palette="danger">*</Span></span>}
            type="iconInput"
            component={ReduxField}
            parse={priceParser}
            format={priceFormatter}
          />
        }
        {nextStage === FAMILY_STAGE_WON &&
          <>
            <Label>Your community referral agreement %<Span palette="danger">*</Span></Label>
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
            {referralAgreementType &&
              <ReferralAgreementWrapper>
                <Field
                  name="referralAgreement"
                  type="iconInput"
                  icon={referralAgreementType === 'percentage' ? 'percentage' : 'dollar'}
                  component={ReduxField}
                  parse={priceParser}
                  format={priceFormatter}
                />
                {/* important to keep in mind that referralAgreement and monthlyFees will be available as string */}
                {referralAgreementType === 'percentage' && referralAgreement && referralAgreement.length > 0 && monthlyFees && monthlyFees.length > 0 &&
                  <Block weight="medium" size="caption" palette="green">Your referral total is ${priceFormatter(referralAgreement * 0.01* monthlyFees)}</Block>}
              </ReferralAgreementWrapper>
            }
            <Role is={PLATFORM_ADMIN_ROLE}>
              <Field
                name="invoiceNumber"
                label="Invoice Number"
                type="text"
                placeholder="0000000"
                component={ReduxField}
              />
              <Field
                name="invoiceAmount"
                type="iconInput"
                icon="dollar"
                label="Invoice Amount"
                placeholder="0.00"
                component={ReduxField}
                parse={priceParser}
                format={priceFormatter}
              />
              <Field
                name="invoicePaid"
                label="Invoice Paid?"
                type="select"
                component={ReduxField}
              >
                <option value="" disabled>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Field>
            </Role>
          </>
        }
        {nextStage === FAMILY_STAGE_LOST &&
          <Field
            name="lossReason"
            label={<span>Loss reason<Span palette="danger">*</Span></span>}
            type="select"
            component={ReduxField}
          >
            <option value="" disabled>Select a reason</option>
            {lossReasonOptions}
          </Field>
        }
        {nextStage === FAMILY_STAGE_LOST && DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason) &&
          <Field
            type="textarea"
            rows={3}
            name="lostDescription"
            label={<span>Description<Span palette="danger">*</Span></span>}
            placeholder="Please leave a note on the reason for closing this lead..."
            component={ReduxField}
          />
        }
        {nextStage === FAMILY_STAGE_LOST && PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason) &&
          <div>
            <Field
              name="preferredLocation"
              type="hidden"
              component={ReduxField}
            />
            <Label><span>Preferred location<Span palette="danger">*</Span></span></Label>
            <SearchBoxContainer
              onLocationSearch={handleLocationChange}
              onTextChange={handleChange}
            />
          </div>
        }
      </ThreeSectionFormTemplate>
    );
  }
}
