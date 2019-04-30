import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { FAMILY_STAGE_ORDERED, FAMILY_STAGE_LOST, DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS } from 'sly/constants/familyDetails';
import { withPreventDefault } from 'sly/services/helpers/forms';
import UpdateFamilyStageForm from 'sly/components/organisms/UpdateFamilyStageForm';

const groups = Object.keys(FAMILY_STAGE_ORDERED);
const optionValues =
  groups
    .map(sg => FAMILY_STAGE_ORDERED[sg])
    .reduce((a, b) => a.concat(b), []);
const lossReasons = [
  'Unresponsive',
  "Dosen't want help",
  'Chose community on own',
  'Working with another agency',
  'Outside territory',
  'Low funds',
  'Passed away',
  'Other',
];

const UpdateFamilyStageFormContainer = reduxForm({
  form: 'UpdateFamilyStageForm',
})(UpdateFamilyStageForm);

storiesOf('Organisms|UpdateFamilyStageForm', module)
  .add('default', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
    />
  ))
  .add('with currentStage', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[1]}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
    />
  ))
  .add('on lost stage', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
    />
  ))
  .add('on lost stage and currentLossReason', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      currentLossReason={DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0]}
    />
  ));
