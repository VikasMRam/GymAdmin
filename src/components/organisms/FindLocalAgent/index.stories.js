import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FindLocalAgent from 'sly/components/organisms/FindLocalAgent';

storiesOf('Organisms|FindLocalAgent', module)
  .add('default', () => (
    <FindLocalAgent onLocationChange={action('onLocationChange')} />
  ));
