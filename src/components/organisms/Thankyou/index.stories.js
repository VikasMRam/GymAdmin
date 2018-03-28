import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Thankyou from '.';

storiesOf('Organisms|Thankyou', module)
  .add('default', () => (
    <Thankyou />
  ));
