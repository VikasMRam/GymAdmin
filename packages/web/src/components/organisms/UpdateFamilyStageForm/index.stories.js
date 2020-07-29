import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_LOST,
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/web/constants/familyDetails';
import { withPreventDefault } from 'sly/common/services/helpers/forms';
import UpdateFamilyStageForm from 'sly/web/components/organisms/UpdateFamilyStageForm';

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
const roomTypes = [
  'Shared Suite',
  'Private Suite',
  '1 Bedroom',
  '2 Bedroom',
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
      roomTypes={roomTypes}
    />
  ))
  .add('with currentStage', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[1]}
      currentStage={optionValues[0]}
      nextStage={optionValues[3]}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      initialValues={{ stage: optionValues[4] }}
      roomTypes={roomTypes}
    />
  ))
  .add('on lost stage', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      currentStage={optionValues[0]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      initialValues={{ stage: FAMILY_STAGE_LOST }}
      roomTypes={roomTypes}
    />
  ))
  .add('on lost stage and paused', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      isPaused
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      currentStage={optionValues[0]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      initialValues={{ stage: FAMILY_STAGE_LOST }}
      roomTypes={roomTypes}
    />
  ))
  .add('on lost stage with normal reason', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      currentStage={optionValues[0]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      currentLossReason={lossReasons[0]}
      initialValues={{ lossReason: lossReasons[0] }}
      roomTypes={roomTypes}
    />
  ))
  .add('on lost stage and loss description field', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      currentStage={optionValues[0]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      currentLossReason={DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0]}
      initialValues={{ lossReason: DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0] }}
      roomTypes={roomTypes}
    />
  ))
  .add('on lost stage and preffered location field', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[2]}
      currentStage={optionValues[0]}
      nextStage={FAMILY_STAGE_LOST}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      nextAllowedStages={optionValues}
      lossReasons={lossReasons}
      currentLossReason={PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0]}
      initialValues={{ lossReason: PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0] }}
      roomTypes={roomTypes}
    />
  ));
