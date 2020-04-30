import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import ImportantCovid19UpdatesStep from 'sly/components/organisms/ImportantCovid19UpdatesStep';
import { withPreventDefault } from 'sly/services/helpers/forms';

const cityName = 'San Francsico';
const buttons = [
  {
    label: 'Get information about senior living communities that are currently accepting new residents',
    value: 'admission-info',
  },
  {
    label: 'Get information about in-home caregivers if you are interested in delaying your move',
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
