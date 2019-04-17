import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';
import { withPreventDefault } from 'sly/services/helpers/forms';
import UpdateFamilyStageForm from 'sly/components/organisms/UpdateFamilyStageForm';

const groups = Object.keys(FAMILY_STAGE_ORDERED);

const UpdateFamilyStageFormContainer = reduxForm({
  form: 'UpdateFamilyStageForm',
})(UpdateFamilyStageForm);

storiesOf('Organisms|UpdateFamilyStageForm', module)
  .add('default', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
    />
  ))
  .add('with currentStage', () => (
    <UpdateFamilyStageFormContainer
      name="Amal"
      currentStageGroup={groups[0]}
      nextStageGroup={groups[1]}
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
    />
  ));
