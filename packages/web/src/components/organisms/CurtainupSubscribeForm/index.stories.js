import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CurtainupSubscribeForm from 'sly/web/components/organisms/CurtainupSubscribeForm';
import { withPreventDefault } from 'sly/common/services/helpers/forms';

const CurtainupSubscribeFormContainer = reduxForm({
  form: 'CurtainupSubscribeForm',
})(CurtainupSubscribeForm);

storiesOf('Organisms|CurtainupSubscribeForm', module)
  .add('default', () => (
    <CurtainupSubscribeFormContainer
      handleSubmit={withPreventDefault(action('form submit'))}
    />
  ));
