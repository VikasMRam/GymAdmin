import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Organisms|CommunitySummary', module)
  .add('default', () => (
    <CommunitySummary
      community={RhodaGoldmanPlaza}
    />
  ))
  .add('with isAdmin', () => (
    <CommunitySummary
      community={RhodaGoldmanPlaza}
      isAdmin
    />
  ));
