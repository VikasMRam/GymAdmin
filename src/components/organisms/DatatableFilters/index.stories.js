import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatatableFilters from '.';

import datatableClient from 'sly/../private/storybook/sample-data/datatable-client.json';

storiesOf('Organisms|DatatableFilters', module).add('default', () => (
  <DatatableFilters datatable={datatableClient} />
));
