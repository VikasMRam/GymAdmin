import React from 'react';
import { storiesOf } from '@storybook/react';

import ReduxField from '.';

storiesOf('Common|Organisms/ReduxField', module)
  .add('default', () => <ReduxField input={{ name: 'name' }} />)
  .add('error', () => (
    <ReduxField
      input={{ name: 'name' }}
      meta={{ touched: true, error: 'Invalid' }}
    />
  ));
