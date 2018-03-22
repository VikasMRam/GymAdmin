import React from 'react';
import { storiesOf } from '@storybook/react';
import ReduxField from '.';

storiesOf('Organisms|ReduxField', module)
  .add('default', () => <ReduxField input={{ name: 'name' }} meta={{}} />)
  .add('error', () => (
    <ReduxField
      input={{ name: 'name' }}
      meta={{ touched: true, error: 'Invalid' }}
    />
  ));
