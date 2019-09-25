import React from 'react';
import { storiesOf } from '@storybook/react';

import Autocomplete from '.';

const column = {
  label: 'Community',
  value: 'organization.name',
  paramKey: 'community',
  type: {
    name: 'MultiSelectDynamicList',
    allowedExpressions: [
      'in',
      'nin',
      'em',
      'nem',
    ],
  },
  typeInfo: {
    api: '/v0/marketplace/communities?fields=name&filter[name]=',
  },
  isFilterable: true,
  isSortable: true,
};

storiesOf('Atoms|Autocomplete', module)
  .add('default', () => (
    <Autocomplete
      column={column}
    />
  ));
