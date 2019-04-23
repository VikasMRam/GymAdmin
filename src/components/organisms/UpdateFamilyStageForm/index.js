import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { palette, size } from 'sly/components/themes';
import { FAMILY_STAGE_ORDERED, FAMILY_STAGE_REJECTED } from 'sly/constants/familyDetails';
import { Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const Warning = styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  padding: ${size('spacing.large')};
`;

const UpdateFamilyStageForm = ({
  handleSubmit, onCancel, name, currentStageGroup, nextStageGroup, showRejectOption, ...props
}) => {
  const NEW_FAMILY_STAGE_ORDERED = { ...FAMILY_STAGE_ORDERED };
  if (!showRejectOption) {
    NEW_FAMILY_STAGE_ORDERED.Closed = NEW_FAMILY_STAGE_ORDERED.Closed.filter(s => s !== FAMILY_STAGE_REJECTED);
  }

  const options = Object.keys(NEW_FAMILY_STAGE_ORDERED).map((sg, ig) => (
    <optgroup label={sg} key={sg}>
      {NEW_FAMILY_STAGE_ORDERED[sg].map((s, i) => <option disabled={ig === 0 && i === 0} key={s} value={s}>{s}</option>)}
    </optgroup>
  ));

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
      <Field
        name="stage"
        label="Stage"
        type="select"
        component={ReduxField}
      >
        {options}
      </Field>
      {currentStageGroup !== nextStageGroup &&
        <Warning size="caption">
          Updating to this stage will move this family from <strong>{currentStageGroup}</strong> to <strong>{nextStageGroup}</strong>.
        </Warning>
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
  showRejectOption: bool,
};

export default UpdateFamilyStageForm;
