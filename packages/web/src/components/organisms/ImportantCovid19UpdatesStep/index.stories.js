import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import ImportantCovid19UpdatesStep from 'sly/web/components/organisms/ImportantCovid19UpdatesStep';
import { withPreventDefault } from 'sly/common/services/helpers/forms';

const cityName = 'San Francsico';
const buttons = [
  {
    label: 'Get updated info on senior living communities near you',
    value: 'admission-info',
  },
  {
    label: 'Get updated info on in-home care agencies near you',
    value: 'in-home',
  },
];

const ImportantCovid19UpdatesStepContainer = reduxForm({
  form: 'ImportantCovid19UpdatesStep',
})(ImportantCovid19UpdatesStep);

storiesOf('Organisms|ImportantCovid19UpdatesStep', module)
  .add('default', () => (
    <ImportantCovid19UpdatesStepContainer cityName={cityName} buttons={buttons} handleSubmit={withPreventDefault(action('onSubmit'))} />
  ))
  .add('without cityName', () => (
    <ImportantCovid19UpdatesStepContainer buttons={buttons} handleSubmit={withPreventDefault(action('onSubmit'))} />
  ));
