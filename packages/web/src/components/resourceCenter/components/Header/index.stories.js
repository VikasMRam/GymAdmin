import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '.';

storiesOf('Resource Center|Header', module)
  .add('default', () => (
    <Header />
  ));
