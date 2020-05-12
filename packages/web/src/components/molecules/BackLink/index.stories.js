import React from 'react';
import { storiesOf } from '@storybook/react';

import BackLink from 'sly/web/components/molecules/BackLink';

storiesOf('Molecules|BackLink', module)
  .add('default', () => (
    <BackLink to="/" />
  ))
  .add('with linkText', () => (
    <BackLink to="/" linkText="test text" />
  ));
