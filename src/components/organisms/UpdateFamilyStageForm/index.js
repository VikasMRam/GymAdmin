import React, { Component } from 'react';
import { func, string, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { palette, size } from 'sly/components/themes';
import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFFERED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/constants/familyDetails';
import pad from 'sly/components/helpers/pad';
import { dateFormatter } from 'sly/services/helpers/date';
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

export default class UpdateFamilyStageForm extends Component {
  static propTypes = {
    handleSubmit: func,
    onCancel: func,
    name: string.isRequired,
    currentStageGroup: string,
    nextStageGroup: string,
    nextStage: string,
    nextAllowedStages: arrayOf(string).isRequired,
    lossReasons: arrayOf(string).isRequired,
    currentLossReason: string,
    change: func.isRequired,
    onLocationChange: func,
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
      handleSubmit, onCancel, name, currentStageGroup, nextStageGroup, nextStage, nextAllowedStages, lossReasons, currentLossReason, ...props
    } = this.props;

    const NEW_FAMILY_STAGE_ORDERED = { ...FAMILY_STAGE_ORDERED };

    const options = Object.keys(NEW_FAMILY_STAGE_ORDERED).map((sg, ig) => (
      <optgroup label={sg} key={sg}>
        {NEW_FAMILY_STAGE_ORDERED[sg].map((s, i) => nextAllowedStages.indexOf(s) !== -1 && <option disabled={ig === 0 && i === 0} key={s} value={s}>{s}</option>)}
      </optgroup>
    ));
    const lossReasonOptions = lossReasons.map(reason => <option key={reason} value={reason}>{reason}</option>);

    const StageField = currentStageGroup !== nextStageGroup ? Field : PaddedField;

    return (
      <ThreeSectionFormTemplate
        {...props}
        hasCancel
        onCancelClick={onCancel}
        hasSubmit
        onSubmit={handleSubmit}
        heading={`Updating ${name}'s Status`}
        submitButtonText={currentStageGroup !== nextStageGroup ? 'Update And Move' : 'Update'}
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
        {currentStageGroup !== nextStageGroup &&
          <Warning size="caption">
            Updating to this stage will move this family from <strong>{currentStageGroup}</strong> to <strong>{nextStageGroup}</strong>.
          </Warning>
        }
        {nextStage !== FAMILY_STAGE_WON && nextStage !== FAMILY_STAGE_LOST &&
          <Field
            type="textarea"
            rows="3"
            maxlength="200"
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
            type="text"
            format={dateFormatter}
            component={ReduxField}
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
            name="monthlyFees"
            label={<span>Resident&apos;s monthly fees (rent + care)<Span palette="danger">*</Span></span>}
            type="iconInput"
            component={ReduxField}
          />
        }
        {nextStage === FAMILY_STAGE_WON &&
          <Field
            name="referralAgreement"
            label={<span>Your community referral agreement %<Span palette="danger">*</Span></span>}
            type="iconInput"
            icon="percentage"
            component={ReduxField}
          />
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
            rows="3"
            name="lostDescription"
            label={<span>Description<Span palette="danger">*</Span></span>}
            maxlength="200"
            placeholder="Please leave a note on the reason for closing this lead..."
            component={ReduxField}
          />
        }
        {nextStage === FAMILY_STAGE_LOST && PREFFERED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(currentLossReason) &&
          <div>
            <Field
              name="preferredLocation"
              type="hidden"
              component={ReduxField}
            />
            <Label><span>Preferred location<Span palette="danger">*</Span></span></Label>
            <SearchBoxContainer
              layout="boxWithoutButton"
              onLocationSearch={handleLocationChange}
              onTextChange={handleChange}
            />
          </div>
        }
      </ThreeSectionFormTemplate>
    );
  }
}
