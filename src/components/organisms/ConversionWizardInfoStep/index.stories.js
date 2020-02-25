import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ConversionWizardInfoStep from 'sly/components/organisms/ConversionWizardInfoStep';

storiesOf('Organisms|ConversionWizardInfoStep', module)
  .add('default', () => (
    <ConversionWizardInfoStep
      heading="Let's double check your Medicaid qualification."
      description="To qualify for Medicaid you must have:"
      button1Text="I qualify for Medicaid"
      button2Text="I do NOT qualify for Medicaid"
      onButton1Click={action('onButton1Click')}
      onButton2Click={action('onButton2Click')}
      points={['Asset limit in most states $1,600 to $15,750', 'Income limit is typically less than $2,360/month']}
    />
  ));
