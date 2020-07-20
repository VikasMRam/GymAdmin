import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';
import LindaIwamota from 'sly/storybook/sample-data/agent-linda-iwamota.json';
import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { End } from 'sly/web/components/wizards/assessment';

const EndContainer = reduxForm({
  form: 'End',
})(End);

storiesOf('Wizards|assessment/Steps/End', module)
  .add('default', () => <EndContainer community={RhodaGoldmanPlaza} handleSubmit={withPreventDefault(action('form submitted'))} />)
  .add('without community', () => <EndContainer city="San Fransisco" handleSubmit={withPreventDefault(action('form submitted'))} />)
  .add('with agent', () => <EndContainer community={RhodaGoldmanPlaza} agent={LindaIwamota} handleSubmit={withPreventDefault(action('form submitted'))} />)
  .add('with hasNoAgent', () => <EndContainer hasNoAgent community={RhodaGoldmanPlaza} handleSubmit={withPreventDefault(action('form submitted'))} />);
