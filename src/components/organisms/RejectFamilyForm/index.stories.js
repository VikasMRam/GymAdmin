import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';
import {
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/constants/familyDetails';
import RejectFamilyForm from 'sly/components/organisms/RejectFamilyForm';

const reasons = [
  'reason 1',
  'reason 2',
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0],
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0],
];
const RejectFamilyFormContainer = reduxForm({
  form: 'RejectFamilyForm',
})(RejectFamilyForm);

storiesOf('Organisms|RejectFamilyForm', module)
  .add('default', () => (
    <RejectFamilyFormContainer
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      reasons={reasons}
    />
  ))
  .add('on reason that requires description', () => (
    <RejectFamilyFormContainer
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      reasons={reasons}
      currentReason={DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0]}
      initialValues={{ reason: DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0] }}
    />
  ))
  .add('on reason that requires preferred location', () => (
    <RejectFamilyFormContainer
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      reasons={reasons}
      currentReason={PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0]}
      initialValues={{ reason: PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0] }}
    />
  ));
