import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import Thankyou from '.';

storiesOf('Molecules|Thankyou', module)
  .add('default', () => (
    <Thankyou community={RhodaGoldmanPlaza} onClose={action('close')} />
  ));
