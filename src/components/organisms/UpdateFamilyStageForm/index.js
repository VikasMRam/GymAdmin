import React from 'react';
import { func, string, bool, arrayOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { palette, size } from 'sly/components/themes';
import { FAMILY_STAGE_ORDERED, FAMILY_STAGE_REJECTED, FAMILY_STAGE_WON } from 'sly/constants/familyDetails';
import pad from 'sly/components/helpers/pad';
import { phoneParser } from 'sly/services/helpers/phone';
import { dateFormatter } from 'sly/services/helpers/date';
import { Block, Span } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

const PaddedField = pad(Field, 'xLarge');
PaddedField.displayName = 'PaddedField';

const UpdateFamilyStageForm = ({
  handleSubmit, onCancel, name, currentStageGroup, nextStageGroup, nextStage, showRejectOption, nextAllowedStages, ...props
}) => {
  const NEW_FAMILY_STAGE_ORDERED = { ...FAMILY_STAGE_ORDERED };

  const options = Object.keys(NEW_FAMILY_STAGE_ORDERED).map((sg, ig) => (
    <optgroup label={sg} key={sg}>
      {NEW_FAMILY_STAGE_ORDERED[sg].map((s, i) => nextAllowedStages.indexOf(s) !== -1 && <option disabled={ig === 0 && i === 0} key={s} value={s}>{s}</option>)}
    </optgroup>
  ));

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
        {options}
      </StageField>
      {currentStageGroup !== nextStageGroup &&
        <Warning size="caption">
          Updating to this stage will move this family from <strong>{currentStageGroup}</strong> to <strong>{nextStageGroup}</strong>.
        </Warning>
      }
      {nextStage !== FAMILY_STAGE_WON &&
        <Field
          type="textarea"
          rows="3"
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
          parse={phoneParser}
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
          component={ReduxField}
        />
      }
    </ThreeSectionFormTemplate>
  );
};

UpdateFamilyStageForm.propTypes = {
  handleSubmit: func,
  onCancel: func,
  name: string.isRequired,
  currentStageGroup: string,
  nextStageGroup: string,
  nextStage: string,
  nextAllowedStages: arrayOf(string),
  showRejectOption: bool,
};

export default UpdateFamilyStageForm;
