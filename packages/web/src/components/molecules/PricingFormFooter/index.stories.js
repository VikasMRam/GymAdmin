import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';

storiesOf('Molecules|PricingFormFooter', module)
  .add('default', () => <PricingFormFooter onProgressClick={action('clicked')} />)
  .add('with palette', () => <PricingFormFooter palette="success" onProgressClick={action('clicked')} />)
  .add('with isFinalStep', () => <PricingFormFooter isFinalStep onProgressClick={action('clicked')} />)
  .add('with isButtonDisabled', () => <PricingFormFooter isButtonDisabled onProgressClick={action('clicked')} />);
