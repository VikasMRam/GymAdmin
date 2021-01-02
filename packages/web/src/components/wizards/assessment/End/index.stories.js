import React from 'react';
import { storiesOf } from '@storybook/react';

import End from '.';
// const EndContainer = reduxForm({
//   form: 'End',
// })(End);

storiesOf('Wizards|assessment/Steps/End', module)
  .add('default', () => <End />);
// .add('without community', () => <EndContainer city="San Fransisco" handleSubmit={withPreventDefault(action('form submitted'))} />)
// .add('with agent', () => <EndContainer community={RhodaGoldmanPlaza} agent={LindaIwamota} handleSubmit={withPreventDefault(action('form submitted'))} />)
// .add('with hasNoAgent', () => <EndContainer hasNoAgent community={RhodaGoldmanPlaza} handleSubmit={withPreventDefault(action('form submitted'))} />);

// storiesOf('Wizards|assessment/Steps/End', module)
//   .add('default', () => <EndContainer community={RhodaGoldmanPlaza} handleSubmit={withPreventDefault(action('form submitted'))} />)
//   .add('without community', () => <EndContainer city="San Fransisco" handleSubmit={withPreventDefault(action('form submitted'))} />)
//   .add('with agent', () => <EndContainer community={RhodaGoldmanPlaza} agent={LindaIwamota} handleSubmit={withPreventDefault(action('form submitted'))} />)
//   .add('with hasNoAgent', () => <EndContainer hasNoAgent community={RhodaGoldmanPlaza} handleSubmit={withPreventDefault(action('form submitted'))} />);
