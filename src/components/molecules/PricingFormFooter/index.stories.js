import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';

storiesOf('Molecules|PricingFormFooter', module)
  .add('default', () => <PricingFormFooter price={4200} onProgressClick={action('clicked')} />)
  .add('with palette', () => <PricingFormFooter price={4200} palette="primary" onProgressClick={action('clicked')} />)
  .add('with isFinalStep', () => <PricingFormFooter price={4200} isFinalStep onProgressClick={action('clicked')} />)
  .add('with isButtonDisabled', () => <PricingFormFooter price={4200} isButtonDisabled onProgressClick={action('clicked')} />);
