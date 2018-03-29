import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Thankyou from '.';

const community = {
  name: 'Rhoda Goldman Plaza',
};

storiesOf('Molecules|Thankyou', module)
  .add('default', () => (
    <Thankyou community={community} onClose={action('close')} />
  ));
