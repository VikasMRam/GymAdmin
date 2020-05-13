import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TableHeaderButtons from 'sly/web/components/molecules/TableHeaderButtons';

storiesOf('Molecules|TableHeaderButtons', module)
  .add('default', () => <TableHeaderButtons />)
  .add('with sort, column and filter buttons', () => <TableHeaderButtons onColumnButtonClick={action('onColumnButtonClick')} onSortButtonClick={action('onSortButtonClick')} onFilterButtonClick={action('onFilterButtonClick')} />);
