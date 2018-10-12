import React from 'react';
import { storiesOf } from '@storybook/react';

import JoinSlyButtons from '.';

storiesOf('Molecules|JoinSlyButtons', module)
  .add('default', () => (
    <JoinSlyButtons />
  ))
  .add('custom heading', () => (
    <JoinSlyButtons heading="hello" />
  ));
