import React from 'react';
import { storiesOf } from '@storybook/react';

import Progress from 'sly/web/components/molecules/Progress';

const steps = ['TIMELINE', 'CARE', 'MEDICAID', 'FINISH'];

storiesOf('Molecules|Progress', module)
  .add('default', () => <Progress steps={steps} />)
  .add('with currentStep', () => <Progress steps={steps} currentStep={steps[0]} />)
  .add('with progress in currentStep', () => <Progress steps={steps} currentStep={steps[1]} />)
  .add('with last step as currentStep', () => <Progress steps={steps} currentStep={steps[3]} />);
