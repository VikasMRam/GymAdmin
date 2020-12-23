import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunitiesByCity from 'sly/web/components/homepage/CommunitiesByCity';

storiesOf('Homepage|CommunitiesByCity', module)
  .add('default', () => (
    <CommunitiesByCity
    />
  ));
