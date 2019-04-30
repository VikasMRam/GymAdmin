import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_LOST,
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/constants/familyDetails';
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
  'Low funds',
  'Passed away',
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0],
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0],
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
      nextStage={optionValues[3]}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      initialValues={{ stage: optionValues[4] }}
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
      initialValues={{ stage: FAMILY_STAGE_LOST }}
    />
  ))
  .add('on lost stage with normal reason', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      currentLossReason={lossReasons[0]}
      initialValues={{ lossReason: lossReasons[0] }}
    />
  ))
  .add('on lost stage and loss description field', () => (
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
      initialValues={{ lossReason: DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0] }}
    />
  ))
  .add('on lost stage and preffered location field', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      currentLossReason={PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0]}
      initialValues={{ lossReason: PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0] }}
    />
  ));
