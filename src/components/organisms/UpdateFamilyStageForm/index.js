import React, { Component } from 'react';
import { func, string, arrayOf, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { palette, size } from 'sly/components/themes';
import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  FAMILY_STAGE_REJECTED,
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
  FAMILY_STAGE_FAMILY_CHOSEN,
  WAITLISTED,
  ESTIMATED_MOVE_IN,
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
    chosenDetails: string,
    lossReasons: arrayOf(string).isRequired,
    roomTypes: arrayOf(string).isRequired,
    rejectReasons: arrayOf(string),
    currentLossReason: string,
    change: func.isRequired,
    onLocationChange: func,
    isPaused: bool,
    monthlyFees: string,
    referralAgreement: string,
    referralAgreementType: string,
    currentRejectReason: string,
  };

  static defaultProps = {
    referralAgreement: '',
    monthlyFees: '',
    rejectReasons: [],
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
    const {
      handleSubmit, onCancel, name, currentStageGroup, nextStageGroup, currentStage, nextStage, chosenDetails, nextAllowedStages, lossReasons,
      currentLossReason, isPaused, referralAgreementType, referralAgreement, monthlyFees, roomTypes, rejectReasons, currentRejectReason, ...props
    } = this.props;

    // const reasonsOptions = rejectReasons.map(r => ({ value: r, label: r }));
    const reasonsOptions = rejectReasons.map(i => <option key={i} value={i}>{i}</option>);

    const NEW_FAMILY_STAGE_ORDERED = { ...FAMILY_STAGE_ORDERED };

    const options = Object.keys(NEW_FAMILY_STAGE_ORDERED).map((sg) => {
      let stages = NEW_FAMILY_STAGE_ORDERED[sg].map(s => nextAllowedStages.indexOf(s) !== -1 && <option key={s} value={s}>{s}</option>);
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

    const isNext = (...stages) => stages.includes(nextStage);

    return (
      <ThreeSectionFormTemplate
        {...props}
        hasCancel
        onCancelClick={onCancel}
        hasSubmit
        onSubmit={handleSubmit}
        heading={isNext(FAMILY_STAGE_REJECTED) ? 'Reject lead' : `Updating ${name}'s Stage`}
        submitButtonText={isNext(FAMILY_STAGE_REJECTED) ? 'Confirm' : 'Update'}
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
        {isNext(FAMILY_STAGE_FAMILY_CHOSEN) &&
          <>
            <Label>Details<Span palette="danger">*</Span></Label>
            <Field
              name="chosenDetails"
              label="Waitlisted"
              type="radio"
              value={WAITLISTED}
              component={ReduxField}
            />
            <Field
              name="chosenDetails"
              label="Estimated Move-in Date"
              type="radio"
              value={ESTIMATED_MOVE_IN}
              component={ReduxField}
            />
          </>
        }
        {(isNext(FAMILY_STAGE_WON) || chosenDetails === ESTIMATED_MOVE_IN) &&
          <Field
            name="moveInDate"
            label={<span>Move-In date<Span palette="danger">*</Span></span>}
            type="date"
            placeholder="mm/dd/yyyy"
            component={ReduxField}
            dateFormat="MM/dd/yyyy"
          />
        }
        {isNext(FAMILY_STAGE_WON, FAMILY_STAGE_FAMILY_CHOSEN) &&
          <Field
            name="communityName"
            label={<span>Community name<Span palette="danger">*</Span></span>}
            type="text"
            component={ReduxField}
          />
        }
        {!isNext(FAMILY_STAGE_WON, FAMILY_STAGE_REJECTED, FAMILY_STAGE_LOST) &&
          <Field
            type="textarea"
            rows={3}
            name="note"
            label="Add a note"
            placeholder="Add a note on why you are updating this family's stage..."
            component={ReduxField}
          />
        }
        {isNext(FAMILY_STAGE_WON) &&
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
        {isNext(FAMILY_STAGE_WON) &&
          <Field
            name="monthlyFees"
            label={<span>Resident&apos;s monthly fees (rent + care)<Span palette="danger">*</Span></span>}
            type="iconInput"
            component={ReduxField}
            parse={priceParser}
            format={priceFormatter}
          />
        }
        {isNext(FAMILY_STAGE_WON) &&
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
                  <Block weight="medium" size="caption" palette="green">Your referral total is ${priceFormatter(referralAgreement * 0.01 * monthlyFees)}</Block>}
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
        {isNext(FAMILY_STAGE_LOST) &&
          <Field
            name="lossReason"
            label={<span>Closed reason<Span palette="danger">*</Span></span>}
            type="select"
            component={ReduxField}
          >
            <option value="" disabled>Select a reason</option>
            {lossReasonOptions}
          </Field>
        }
        {isNext(FAMILY_STAGE_REJECTED) &&
          <Field
            name="rejectReason"
            label={<span>Select a reason<Span palette="danger">*</Span></span>}
            type="select"
            placeholder="Select rejection reason"
            component={ReduxField}
          >
            <option value="" disabled>Select</option>
            {reasonsOptions}
          </Field>
        }
        {isNext(FAMILY_STAGE_LOST, FAMILY_STAGE_REJECTED) &&
          (DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentRejectReason) ||
          DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason)) &&
          <Field
            type="textarea"
            rows={3}
            showCharacterCount
            name={FAMILY_STAGE_LOST ? 'lostDescription' : 'rejectDescription'}
            label={<span>Description<Span palette="danger">*</Span></span>}
            placeholder="Please leave a note on the reason for closing this lead..."
            component={ReduxField}
            maxLength={200}
          />
        }
        {isNext(FAMILY_STAGE_LOST, FAMILY_STAGE_REJECTED) &&
          (PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason) ||
          PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentRejectReason)) &&
          <div>
            <Field
              name="preferredLocation"
              type="hidden"
              component={ReduxField}
            />
            <Label><span>Preferred location<Span palette="danger">*</Span></span></Label>
            <SearchBoxContainer
              onLocationSearch={this.handleLocationChange}
              onTextChange={this.handleChange}
            />
          </div>
        }
      </ThreeSectionFormTemplate>
    );
  }
}
