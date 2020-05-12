import React from 'react';
import { storiesOf } from '@storybook/react';

import Stage from 'sly/web/components/molecules/Stage';

storiesOf('Molecules|Stage', module)
  .add('default', () => <Stage stage="New" />);
