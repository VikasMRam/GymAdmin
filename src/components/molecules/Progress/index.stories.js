import React from 'react';
import { storiesOf } from '@storybook/react';

import Progress from 'sly/components/molecules/Progress';

const steps = ['TIMELINE', 'CARE', 'MEDICAID', 'FINISH'];

storiesOf('Molecules|Progress', module)
  .add('default', () => <Progress steps={steps} />)
  .add('with currentStep', () => <Progress steps={steps} currentStep={steps[0]} />);
