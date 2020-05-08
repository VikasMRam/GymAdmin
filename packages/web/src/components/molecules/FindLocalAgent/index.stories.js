import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FindLocalAgent from 'sly/components/molecules/FindLocalAgent';

storiesOf('Molecules|FindLocalAgent', module)
  .add('default', () => (
    <FindLocalAgent onLocationChange={action('onLocationChange')} />
  ));
