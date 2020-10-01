import React from 'react';
import { storiesOf } from '@storybook/react';

import ProgressBar from '.';

storiesOf('Molecules|ProgressBar', module)
  .add('default', () => <ProgressBar totalSteps={5} />)
  .add('with currentStep', () => <ProgressBar totalSteps={5} currentStep={3} />)
  .add('with label', () => <ProgressBar totalSteps={5} label />);

