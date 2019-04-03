import React from 'react';
import { storiesOf } from '@storybook/react';

import Th from 'sly/components/molecules/Th';

storiesOf('Molecules|Th', module)
  .add('default', () => (
    <Th>Stage</Th>
  ))
  .add('sort asc', () => (
    <Th sort="asc">Stage</Th>
  ))
  .add('sort desc', () => (
    <Th sort="desc">Stage</Th>
  ));
